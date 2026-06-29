"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Buffer A (simulation) shader ───────────────────────────────────────────

const bufferAVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const bufferAFrag = /* glsl */ `
  precision highp float;

  uniform sampler2D iChannel0;   // previous frame state
  uniform vec2      iResolution;
  uniform vec4      iMouse;      // xy=pos, z=isDown, w=unused
  uniform int       iFrame;

  varying vec2 vUv;

  const float delta = 1.0;

  void main() {
    if (iFrame == 0) { gl_FragColor = vec4(0.0); return; }

    vec2 fragCoord = vUv * iResolution;

    float pressure = texture2D(iChannel0, vUv).x;
    float pVel     = texture2D(iChannel0, vUv).y;

    vec2 texel = 1.0 / iResolution;

    float p_right = texture2D(iChannel0, vUv + vec2( texel.x, 0.0)).x;
    float p_left  = texture2D(iChannel0, vUv + vec2(-texel.x, 0.0)).x;
    float p_up    = texture2D(iChannel0, vUv + vec2(0.0,  texel.y)).x;
    float p_down  = texture2D(iChannel0, vUv + vec2(0.0, -texel.y)).x;

    // Reflective (Neumann) boundary conditions
    if (fragCoord.x < 1.0)               p_left  = p_right;
    if (fragCoord.x > iResolution.x - 1.0) p_right = p_left;
    if (fragCoord.y < 1.0)               p_down  = p_up;
    if (fragCoord.y > iResolution.y - 1.0) p_up    = p_down;

    // 2-D wave Laplacian
    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
    pVel += delta * (-2.0 * pressure + p_up    + p_down) / 4.0;

    pressure += delta * pVel;

    // Restoring force  → water-surface look
    pVel -= 0.005 * delta * pressure;

    // Damping
    pVel     *= 1.0 - 0.002 * delta;
    pressure *= 0.999;

    // x = pressure, y = pVel, zw = gradient (used for normals / refraction)
    gl_FragColor = vec4(
      pressure,
      pVel,
      (p_right - p_left) / 2.0,
      (p_up    - p_down) / 2.0
    );

    // Mouse disturbance
    if (iMouse.z > 0.5) {
      float dist = distance(fragCoord, iMouse.xy);
      if (dist <= 20.0) {
        gl_FragColor.x += 1.0 - dist / 20.0;
      }
    }
  }
`;

// ─── Image (display) shader ──────────────────────────────────────────────────

const imageVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const imageFrag = /* glsl */ `
  precision highp float;

  uniform sampler2D iChannel0;   // simulation buffer
  uniform sampler2D iChannel1;   // background texture
  uniform vec2      iResolution;

  varying vec2 vUv;

  void main() {
    vec4 data   = texture2D(iChannel0, vUv);

    // Refraction offset using stored gradient (zw)
    vec2 refractedUv = vUv + 0.2 * data.zw;
    gl_FragColor = texture2D(iChannel1, refractedUv);

    // Specular sunlight glint
    vec3 normal = normalize(vec3(-data.z, 0.2, -data.w));
    float spec  = pow(max(0.0, dot(normal, normalize(vec3(-3.0, 10.0, 3.0)))), 60.0);
    gl_FragColor.rgb += vec3(spec);
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

interface WaveSimulationProps {
  /** Optional background texture URL. Defaults to a procedural blue-green gradient. */
  backgroundUrl?: string;
  className?: string;
}

export default function WaveSimulation({
  backgroundUrl,
  className,
}: WaveSimulationProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(1); // keep 1:1 for the simulation grid
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Ping-pong render targets ──────────────────────────────────────────
    const rtOpts: THREE.RenderTargetOptions = {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    };
    let rtA = new THREE.WebGLRenderTarget(W, H, rtOpts);
    let rtB = new THREE.WebGLRenderTarget(W, H, rtOpts);

    // ── Background texture ────────────────────────────────────────────────
    // Procedural fallback: a simple blue-green canvas texture
    let bgTexture: THREE.Texture;
    if (backgroundUrl) {
      bgTexture = new THREE.TextureLoader().load(backgroundUrl);
      bgTexture.wrapS = bgTexture.wrapT = THREE.RepeatWrapping;
    } else {
      const bgCanvas = document.createElement("canvas");
      bgCanvas.width = 512;
      bgCanvas.height = 512;
      const ctx = bgCanvas.getContext("2d")!;
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, "#1a6b8a");
      grad.addColorStop(0.4, "#24a0c2");
      grad.addColorStop(0.7, "#1d8c6f");
      grad.addColorStop(1, "#0e4f7a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      // subtle pattern
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      for (let i = 0; i < 40; i++) {
        ctx.fillRect(
          Math.random() * 512,
          Math.random() * 512,
          80 + Math.random() * 120,
          2,
        );
      }
      bgTexture = new THREE.CanvasTexture(bgCanvas);
      bgTexture.wrapS = bgTexture.wrapT = THREE.RepeatWrapping;
    }

    // ── Fullscreen quad geometry ──────────────────────────────────────────
    const quadGeo = new THREE.PlaneGeometry(2, 2);

    // ── Buffer A material ─────────────────────────────────────────────────
    const simUniforms = {
      iChannel0: { value: rtA.texture },
      iResolution: { value: new THREE.Vector2(W, H) },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      iFrame: { value: 0 },
    };
    const simMat = new THREE.ShaderMaterial({
      vertexShader: bufferAVert,
      fragmentShader: bufferAFrag,
      uniforms: simUniforms,
      depthTest: false,
      depthWrite: false,
    });
    const simMesh = new THREE.Mesh(quadGeo, simMat);
    const simScene = new THREE.Scene();
    const simCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    simScene.add(simMesh);

    // ── Image material ────────────────────────────────────────────────────
    const imgUniforms = {
      iChannel0: { value: rtB.texture },
      iChannel1: { value: bgTexture },
      iResolution: { value: new THREE.Vector2(W, H) },
    };
    const imgMat = new THREE.ShaderMaterial({
      vertexShader: imageVert,
      fragmentShader: imageFrag,
      uniforms: imgUniforms,
      depthTest: false,
      depthWrite: false,
    });
    const imgMesh = new THREE.Mesh(quadGeo, imgMat);
    const imgScene = new THREE.Scene();
    const imgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    imgScene.add(imgMesh);

    // ── Mouse handling ────────────────────────────────────────────────────
    const mouse = new THREE.Vector4(0, 0, 0, 0);

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = H - (e.clientY - rect.top); // flip Y (GL convention)
    };
    const onMouseDown = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = H - (e.clientY - rect.top);
      mouse.z = 1;
    };
    const onMouseUp = () => {
      mouse.z = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = mount.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.x = touch.clientX - rect.left;
      mouse.y = H - (touch.clientY - rect.top);
      mouse.z = 1;
    };
    const onTouchEnd = () => {
      mouse.z = 0;
    };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mouseover", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    mount.addEventListener("touchmove", onTouchMove, { passive: false });
    mount.addEventListener("touchend", onTouchEnd);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      rtA.setSize(w, h);
      rtB.setSize(w, h);
      simUniforms.iResolution.value.set(w, h);
      imgUniforms.iResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Render loop ───────────────────────────────────────────────────────
    let frame = 0;
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Update simulation uniforms
      simUniforms.iChannel0.value = rtA.texture;
      simUniforms.iFrame.value = frame;
      simUniforms.iMouse.value.copy(mouse);

      // Render Buffer A → rtB
      renderer.setRenderTarget(rtB);
      renderer.render(simScene, simCam);

      // Swap buffers
      [rtA, rtB] = [rtB, rtA];

      // Render image pass → screen
      imgUniforms.iChannel0.value = rtA.texture;
      renderer.setRenderTarget(null);
      renderer.render(imgScene, imgCam);

      frame++;
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("touchmove", onTouchMove);
      mount.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      bgTexture.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, [backgroundUrl]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        cursor: "crosshair",
        touchAction: "none",
      }}
    />
  );
}

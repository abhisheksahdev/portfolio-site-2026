"use client";

import {
  renderFragmentShader,
  renderVertexShader,
  simulationFragmentShader,
  simulationVertexShader,
} from "@/app/shaders/ripple-shadders";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WaveSimulation() {
  const mountRef = useRef<HTMLDivElement>(null);

  const heroText = "thither";
  const bgColor = "#004F2D";

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // scenes
    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    renderer.setSize(mount.clientWidth, mount.clientHeight);

    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2();
    let frame = 0;

    const width = mount.clientWidth * window.devicePixelRatio;
    const height = mount.clientHeight * window.devicePixelRatio;

    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };

    let rtA = new THREE.WebGLRenderTarget(width, height, options);
    let rtB = new THREE.WebGLRenderTarget(width, height, options);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector3(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    // const hero = document.getElementById("hero");
    const canvas = document.createElement("canvas");

    // hero?.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", { alpha: true });

    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const fontSize = Math.round(250 * window.devicePixelRatio);
      ctx.fillStyle = "#FEF4B8";
      ctx.font = `bold ${fontSize}px Test`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.textRendering = "geometricPrecision";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.fillText(heroText, width / 2, height / 2);
    }

    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.format = THREE.RGBAFormat;

    const onResize = () => {
      const newWidth = mount.clientWidth * window.devicePixelRatio;
      const newHeight = mount.clientHeight * window.devicePixelRatio;

      renderer.setSize(mount.clientWidth, mount.clientHeight);
      rtA.setSize(newWidth, newHeight);
      rtB.setSize(newWidth, newHeight);
      simMaterial.uniforms.resolution.value.set(newWidth, newHeight);

      canvas.width = newWidth;
      canvas.height = newHeight;

      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, newWidth, newHeight);

        const newFontSize = Math.round(250 * window.devicePixelRatio);
        ctx.fillStyle = "#FEF4B8";
        ctx.font = `bold ${newFontSize}px Test`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(heroText, width / 2, height / 2);
      }

      textTexture.needsUpdate = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX * window.devicePixelRatio;
      mouse.y = (mount.clientHeight - e.clientY) * window.devicePixelRatio;
    };

    const onMouseLeave = () => {
      mouse.set(0, 0);
    };

    window.addEventListener("resize", onResize);

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseleave", onMouseLeave);

    let rafId: number;
    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;

      simMaterial.uniforms.textureA.value = rtA.texture;
      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtB.texture;
      renderMaterial.uniforms.textureB.value = textTexture;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      const temp = rtA;
      rtA = rtB;
      rtB = temp;

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      //   mount.removeEventListener("mousemove", onMouseMove);
      //   mount.removeEventListener("touchmove", onTouchMove);
      //   mount.removeEventListener("touchend", onTouchEnd);
      //   window.removeEventListener("resize", onResize);
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      textTexture.dispose();
      //   if (mount.contains(renderer.domElement))
      //     mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "crosshair",
      }}
    />
  );
}

import Link from "next/link";
import { SiReaddotcv } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t-[0.5px] border-gray-800 shadow-2xl text-sm app-footer">
      <div className="mb-10 p-10">
        <div className="flex justify-between items-top">
          <div>
            <div className="font-bold text-3xl font-logo ">.AVI</div>
            <div className="font-medium text-4xl font-logo text-gray-400">
              I MUST NOT FEAR
            </div>
            <div className="flex gap-x-6 items-center mt-5">
              <a
                href="https://github.com/abhisheksahdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-gray-500 hover:text-white transition-colors duration-200 size-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/abhisheksahdev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-gray-500 hover:text-blue-500 transition-colors duration-200 size-7" />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <SiReaddotcv
                  size={32}
                  className="text-gray-500 hover:text-white transition-colors duration-200 size-7"
                />
              </a>
            </div>
          </div>
          <nav className="flex items-start gap-x-12">
            <div className="flex flex-col gap-3 ">
              <p className="font-mono text-gray-400">[CONTACT]</p>
              <ul className="flex flex-col gap-2 footer-link-con">
                <li>
                  <a href="mailto:abxisheksah@gmail.com">
                    abxisheksah@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+917908174073">+91-7908174073</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-mono text-gray-400">[LEGAL]</p>
              <ul className="flex flex-col gap-2 footer-link-con">
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Cookie Settings</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-mono text-gray-400">[SITEMAP]</p>
              <ul className="flex flex-col gap-2 footer-link-con">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/work">Work</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            {/* <div className="flex flex-col gap-3">
              <p className="font-mono text-gray-400">[SOCIAL]</p>
              <ul className="flex flex-col gap-2 footer-link-con">
                <li>
                  <a
                    href="https://www.linkedin.com/in/abhisheksahdev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/abhisheksahdev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div> */}
          </nav>
        </div>
      </div>
    </footer>
  );
}

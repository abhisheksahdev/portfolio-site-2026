import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-[0.5px] border-gray-800 shadow-2xl text-sm app-footer">
      <div className="mb-10 p-10">
        <div className="flex justify-between items-top">
          <div>
            <div className="font-bold text-3xl font-logo ">.AVI</div>
            <div className="font-medium text-xl font-logo text-gray-400">
              I MUST NOT FEAR
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
            <div className="flex flex-col gap-3">
              <p className="font-mono text-gray-400">[SOCIAL]</p>
              <ul className="flex flex-col gap-2 footer-link-con">
                <li>
                  <a href="https://www.linkedin.com/in/abhisheksahdev/">
                    Linkedin
                  </a>
                </li>
                <li>
                  <a href="#">Insta</a>
                </li>
                <li>
                  <a href="https://github.com/abhisheksahdev">Github</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {/* <div className="flex justify-between items-center font-mono text-sm mt-20">
          <span>[2026 ABHISHEK SAH]</span>
          <span>Made in India</span>
        </div> */}
      </div>
    </footer>
  );
}

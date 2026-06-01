import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Links } from "./ui/nav-links";
import { Taskbar } from "./ui/taskbar";

const BarlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500"],
});
const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500"],
});

const DMMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Abhishek",
  description: "Freelance Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${DMSans.variable} ${DMMono.variable} ${BarlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Links />
        {children}
        <Taskbar />
      </body>
    </html>
  );
}

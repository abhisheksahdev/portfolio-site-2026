import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Taskbar } from "./ui/taskbar";
import { Footer } from "./ui/footer";
import LenisProvider from "./components/LenisProvider";
import CustomCursor from "./components/CustomCursor/page";
import { NavBar } from "./components/NavBar/page";

const BarlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});
const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["500"],
});

const DMMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
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
        <LenisProvider>
          {children}
          <Footer />
        </LenisProvider>
        <NavBar />
        <Taskbar />
        <CustomCursor />
      </body>
    </html>
  );
}

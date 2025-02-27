import type { Metadata } from "next";
import { Lora, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/blocks/Dashboard/components";
import bg from "../../public/background.png";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blogs",
  description: "A collection of my blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
        className={`${notoSans.className} ${lora.variable} antialiased`}
      >
        <Header />
        <div className="w-full xl:max-w-7xl md:max-w-xl max-w-sm mx-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "RoomZen - Premium Operating System for Student Housing",
  description: "Manage complaints, gate passes, room allocation, payments and communication from one intelligent platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-white">
        {children}
      </body>
    </html>
  );
}

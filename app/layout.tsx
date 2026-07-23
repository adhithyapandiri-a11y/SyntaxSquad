import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoomZen - The Smart Operating System for Student Housing",
  description: "Manage complaints, gate passes, room allocation, payments and communication from one intelligent platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}

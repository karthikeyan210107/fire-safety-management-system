import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Fire Management System",
  description: "Fire Safety Inspection and Emergency Response Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#070707] text-white antialiased">
        <Sidebar />

        <div className="min-h-screen pl-64">
          {children}
        </div>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import '../styles/globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <SessionProviderWrapper>
        <Navbar />
        {children}
        <Footer />
        </SessionProviderWrapper>
        
      </body>
    </html>
  );
}

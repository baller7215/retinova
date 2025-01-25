import "./globals.css";
import Navbar from "../components/navbar"
import Footer from "../components/footer"

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-w-screen min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

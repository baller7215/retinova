import "./globals.css";
import Navbar from "../components/navbar"
import Footer from "../components/footer"

import "leaflet/dist/leaflet.css";

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/logo.png" />
        <title>Retinova</title>
      </head>
      <body className="min-w-screen min-h-screen h-auto">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

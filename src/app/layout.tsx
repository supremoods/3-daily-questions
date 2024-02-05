import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./style.css";

import { ChakraProvider } from "@chakra-ui/react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3 daily questions",
  description: "This app is designed to assist with reviews."
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}

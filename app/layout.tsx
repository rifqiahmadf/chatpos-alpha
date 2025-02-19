import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
// import { useAuth } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DIVA Pos Indonesia",
  description: "A simple website with an embedded chat interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // useAuth(); // Adds auth checks to all pages
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";

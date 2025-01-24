import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
// import { useAuth } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatpos Alpha",
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
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";

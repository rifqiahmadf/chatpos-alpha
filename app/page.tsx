"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Linkedin } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const proxyUrl = `/api/proxy?shared_id=e5b54d2cd80311efa1100242ac120006&from=chat&auth=IzMDUyMTlhZDgwMjExZWZhOWVkMDI0Mm`;

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-100">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          {/* Group title and Notes button */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Chatpos Alpha</h1>
            <Button
              className="relative border border-gray-300 bg-white text-black hover:bg-gray-50"
              onClick={() => console.log("Notes clicked")}
            >
              Notes
              <span className="animate-ping absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600/80"></span>
            </Button>
          </div>

          {/* Logout on the far right */}
          <Button onClick={signOut}>Logout</Button>
        </div>

        <Card className="w-full">
          <CardContent className="p-0 overflow-hidden">
            <iframe
              src="https://rifqi.alyafauzi.id/chat/share?shared_id=d53ec49ada7511efab680242ac120006&from=chat&auth=IzMDUyMTlhZDgwMjExZWZhOWVkMDI0Mm"
              style={{
                width: "100%",
                height: "calc(100vh - 200px)",
                minHeight: "400px",
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            />
          </CardContent>
        </Card>
      </div>
      <footer className="mt-4 text-center text-sm text-gray-500 flex flex-col items-center">
        <span>
          Created by Rifqi Ahmad Fauzi - Bagian Data Center and Clouds
        </span>
        <a
          href="https://www.linkedin.com/in/rifqiahmadf/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full transition-colors duration-200"
        >
          <Linkedin size={16} />
        </a>
      </footer>
    </main>
  );
}

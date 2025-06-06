"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import NotesModal from "@/components/NotesModal";

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const [showNotes, setShowNotes] = useState(true);

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
            <h1
              className="karla-regular text-3xl font-bold"
              style={{ color: "#1e2e59" }}
            >
              DAVA
            </h1>
            <Button
              className="relative border border-gray-300 bg-white text-black hover:bg-gray-50"
              onClick={() => setShowNotes(true)}
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
              src="http://10.24.1.43:81/chat/share?shared_id=dda8f3e0257e11f09eefaa1f4bac762f&from=agent&auth=Y0NTA0OGY4MjU5MzExZjBhMWNkYWExZj"
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
        <span>Created by TIM AI</span>
      </footer>

      {/* Render the Notes Modal */}
      <NotesModal isOpen={showNotes} onClose={() => setShowNotes(false)} />
    </main>
  );
}

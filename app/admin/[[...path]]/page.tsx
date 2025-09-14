"use client";

import "@measured/puck/puck.css";
import { Puck, Data } from "@measured/puck";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import config from "@/lib/puck-config";

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const path = params.path ? `/${(params.path as string[]).join("/")}` : "/home";
  
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load existing page data if it exists
    fetch(`/api/puck?path=${encodeURIComponent(path)}`)
      .then(res => res.json())
      .then(pageData => {
        setData(pageData || { content: [], root: {} });
        setLoading(false);
      })
      .catch(() => {
        // If page doesn't exist, start with empty data
        setData({ content: [], root: {} });
        setLoading(false);
      });
  }, [path]);

  const handlePublish = async (updatedData: Data) => {
    try {
      const response = await fetch("/api/puck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          data: updatedData,
          published: true
        })
      });

      if (response.ok) {
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
        notification.textContent = 'Page published successfully!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.remove();
        }, 3000);

        // Open preview in new tab
        window.open(`/preview${path}`, '_blank');
      }
    } catch (error) {
      console.error("Error publishing:", error);
      alert("Error publishing page");
    }
  };

  const handleSaveDraft = async (updatedData: Data) => {
    try {
      const response = await fetch("/api/puck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          data: updatedData,
          published: false
        })
      });

      if (response.ok) {
        console.log("Draft saved");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Puck
        config={config}
        data={data || { content: [], root: {} }}
        onPublish={handlePublish}
        onChange={(updatedData) => {
          setData(updatedData);
          // Auto-save draft every 5 seconds
          handleSaveDraft(updatedData);
        }}
        headerTitle={`Montagna Travel - Editing: ${path}`}
        headerPath={path}
      />
    </div>
  );
}
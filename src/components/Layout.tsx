import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <main className="container mx-auto px-4 py-12 flex-grow">{children}</main>
    </div>
  );
}

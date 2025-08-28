// src/components/PageWrapper.tsx
import React from "react";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-start min-h-full w-full">
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
}

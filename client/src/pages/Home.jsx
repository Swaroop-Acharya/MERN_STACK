import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">My Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Projects Done</h2>
            <p className="text-gray-700">Showcase your projects here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Freelancing Clients Count</h2>
            <p className="text-gray-700">Display your freelancing client count.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useAuth } from "../store/auth";
export default function About() {
  const { user } = useAuth();

  return (
    <main className="text-white">
      <section className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>
        <div className="bg-white text-black p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Who Am I?</h2>
          <p className="mb-4">
            Welcome
            {user
              ? ` ${user.username} to my portfolio `
              : " to my portfolio"}{" "}
          </p>
          <p className="text-gray-700 text-justify">
            I hold a degree in Information Science and Engineering from Sahyadri
            College of Engineering and Management, Mangalore, and currently
            looking for oppertunities , where I initially interned at
            LTIMindtree for 3 Months. As a passionate Developer, I thrive on
            exploring new frameworks and libraries. My recent focus has been on
            mastering MERN Stack.
          </p>
        </div>
      </section>
    </main>
  );
}

import React, { useState } from "react";
import { useAuth } from "../store/auth";
export default function About() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100  flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <p>
          Welcome,{user ? ` ${user.username} to our website ` : " to Our Website"}{" "}
        </p>
        <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Who Am I?</h2>
          <p className="text-gray-700">
            Write a brief description about yourself and your skills here.
          </p>
        </div>
      </div>
    </div>
  );
}

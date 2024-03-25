import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Login() {
  const {storeTokenInLS}=useAuth();
  const navigate=useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
   
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    // Add your login logic here
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if(response.ok){
        const res_data=await response.json();
        storeTokenInLS(res_data.token)
        console.log(res_data)
        setUser({
          username:"",
          password:"",
        })
        navigate("/")
      }
      console.log(response);
    } catch (error) {
      console.log("Login" + error);
    }
  };

  return (
    <main className="flex justify-center items-center">
      <section className="flex-1 p-4">
        <div>
          <h1>Login</h1>
        </div>
      </section>
      <section className="flex-1 p-4">
        <div>
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                onChange={handleInput}
                value={user.email}
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                onChange={handleInput}
                value={user.password}
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
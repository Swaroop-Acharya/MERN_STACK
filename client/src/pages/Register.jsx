import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";


export default function Register() {
  const {storeTokenInLS}=useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate=useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
    // console.log(user);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if(response.ok){

        const res_data =await response.json();
       
        //storing the token in client(browser)
        storeTokenInLS(res_data.token)
        console.log(res_data)
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        })
        navigate("/login")
      }
      console.log(response);
    } catch (error) {
      console.log("registration" + error);
    }
  };
  return (
    <main className="flex justify-center items-center">
      <section className="flex-1 p-4">
        <div>
          <h1>Register</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod,
            enim.
          </p>
        </div>
      </section>
      <section className="flex-1 p-4">
        <div>
          <h1>Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                onChange={handleInput}
                value={user.username}
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                onChange={handleInput}
                value={user.phone}
                id="phone"
                name="phone"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
              Register
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

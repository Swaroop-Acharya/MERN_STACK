import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"
export default function Register() {
  const { storeTokenInLS } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

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
      const res_data = await response.json();

      toast(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      console.log(res_data)
      if (response.ok) {
        //storing the token in client(browser)
        storeTokenInLS(res_data.token);
        console.log(res_data);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/about");
      }else{
        console.log("Invalid inputs")
      }
      console.log(response);
    } catch (error) {
      toast.error("registration" + error);
    }
  };
  return (
    <main className="flex mt-14 justify-center items-center">
      <section className="flex gap-20 p-4">
      <div className="text-white mt-16 w-2/5">
          <h1 className="text-2xl font-semibold">Hello there</h1>
          <p className="text-xl ">Register send message on the go</p>
        </div>
        <div className="w-3/5">
        <h1 className="text-3xl font-bold text-white mb-3">Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
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
                className="block text-sm font-medium text-white"
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
                className="block text-sm font-medium text-white"
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
                className="block text-sm font-medium text-white"
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
              className="border text-white relative inline-flex items-center justify-start  px-6 py-3 overflow-hidden font-bold rounded-full group hover:bg-white hover:text-blue-500"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

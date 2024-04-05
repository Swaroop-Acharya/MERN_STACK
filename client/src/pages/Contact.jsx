import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Contact() {
  const [contactInfo, setContactInfo] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [userData, setUserData] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  if (userData && user) {
    setContactInfo({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
    console.log(contactInfo);
  };

  const handleSubmit = async (e) => {
    console.log(contactInfo);
    e.preventDefault();
    const URL = `https://mern-stack-server-nine.vercel.app/api/form/contact`;
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      });
      const contact_data = await response.json();
      toast(contact_data.message);
      if (response.ok) {
        setContactInfo({
          username: user.username,
          email: user.email,
          message: "",
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Something went wront will contacting" + error);
    }
  };

  return (
    <main className="flex justify-center mt-14 items-center">
      <section className="flex gap-10 p-4">
        <div className="text-white mt-16 w-2/5">
          <h1 className="text-2xl font-semibold">Hello there</h1>
          <p className="text-xl ">Get in touch with me for project colaboration or oppertunities</p>
        </div>
        <div className="w-3/5">
          <h1 className="text-3xl font-bold text-white">Contact Me</h1>
          <form className="mt-5" onSubmit={handleSubmit}>
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
                value={contactInfo.username}
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
                value={contactInfo.email}
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                onChange={handleInput}
                value={contactInfo.message}
                id="message"
                name="message"
                className="mt-1 p-2 w-full border rounded-md"
              ></textarea>
            </div>
            <button
              type="submit"
              className="border text-white relative inline-flex items-center justify-start  px-6 py-3 overflow-hidden font-bold rounded-full group hover:bg-white hover:text-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

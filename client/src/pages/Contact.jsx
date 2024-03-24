import React, { useState } from "react";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
    console.log(contactInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactInfo);
    // Add your contact form submission logic here
  };

  return (
    <main className="flex justify-center items-center">
      <section className="flex-1 p-4">
        <div>
          <h1>Contact Us</h1>
        </div>
      </section>
      <section className="flex-1 p-4">
        <div>
          <h1>Contact Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
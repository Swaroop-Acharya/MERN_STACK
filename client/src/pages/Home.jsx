import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <section className="flex items-center mt-24 justify-center gap-32">
        <div className="w-1/5 h-1/5 ">
          <img
            src="/Profile.JPG"
            className="block rounded-full"
            alt="profile photo"
          />
        </div>
        <div className="flex flex-col gap-5 text-white">
          <div className="flex flex-col gap-3 justify-center items-center">
            <p className="font-semibold drop-in-2">Hello, I'm</p>
            <h1 className="text-3xl md:text-5xl font-semibold drop-in-2">
              Swaroop
            </h1>
            <h1 className="font-semibold drop-in-2">Software Developer</h1>
          </div>
          <div className="flex gap-5 justify-center items-center">
            <Link
              to="/contact"
              className="border relative inline-flex items-center justify-start  px-6 py-3 overflow-hidden font-bold rounded-full group hover:bg-white hover:text-blue-500"
            >
              Contact Me
            </Link>
            <a
              href="https://drive.google.com/file/d/116W19JOl4FjzhpMFPXicJX216-eCQARn/view?usp=drive_link"
              target="_blank"
              className="border relative inline-flex items-center justify-start  px-6 py-3 overflow-hidden font-bold rounded-full group hover:bg-white hover:text-blue-500"
            >
              <button>Resume</button>
            </a>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <a
              href=""
              target="_blank"
              className="block"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-10 h-10" />
            </a>
            <a
              href=""
              target="_blank"
              className="block"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-10 h-10" />
            </a>
            <a
              href=""
              target="_blank"
              className="block"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="w-10 h-10" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

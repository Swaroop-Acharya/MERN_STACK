import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  return (
    <header className="text-white mt-3">
      <div className="container flex justify-between items-center  p-4">
        <div>
          <Link to="/" className="text-2xl ">
            Swaroop
          </Link>
        </div>
        <nav>
          <ul className="flex text-2xl space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-gray-300">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register" className="hover:text-gray-300">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

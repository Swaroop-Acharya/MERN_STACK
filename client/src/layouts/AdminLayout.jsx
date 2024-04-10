import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function AdminLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[65vh]">
        <ReactLoading
          type={"bars"}
          color={"white"}
          height={"10%"}
          width={"10%"}
        />
      </div>
    );
  }

  if (!user.isAdmin) {
    navigate("/");
  }

  return (
    <div className="flex h-[90vh]">
      <nav className="bg-gray-200 w-48 p-4 h-full flex flex-col justify-between">
        <ul className="flex flex-col">
          <li className="mb-2">
            <Link
              to="/admin/home"
              className={`text-gray-800 font-semibold hover:text-gray-900 ${
                location.pathname === "/admin/home" && "bg-gray-300 pr-10"
              }`}
            >
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/users"
              className={`text-gray-800 font-semibold hover:text-gray-900 ${
                location.pathname === "/admin/users" && "bg-gray-300 pr-10"
              }`}
            >
              Users
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/projects"
              className={`text-gray-800 font-semibold hover:text-gray-900 ${
                location.pathname === "/admin/projects" && "bg-gray-300 pr-10"
              }`}
            >
              Projects
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/contacts"
              className={`text-gray-800 font-semibold hover:text-gray-900 ${
                location.pathname === "/admin/contacts" && "bg-gray-300 pr-10"
              }`}
            >
              Contacts
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex-1 justify-center items-center p-4 h-[90vh]  bg-[#222831]">
        <Outlet />
      </div>
    </div>
  );
}

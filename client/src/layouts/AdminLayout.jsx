import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <nav className="bg-gray-200 w-48 py-4 h-full flex flex-col justify-between">
        <ul className="flex flex-col">
          <li className="mb-2">
            <Link to="/admin" className="text-gray-800 hover:text-gray-900">Home</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/users" className="text-gray-800 hover:text-gray-900">Users</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/projects" className="text-gray-800 hover:text-gray-900">Projects</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/contacts" className="text-gray-800 hover:text-gray-900">Contacts</Link>
          </li>
        </ul>
        {/* Optional: Add footer or additional content here */}
      </nav>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

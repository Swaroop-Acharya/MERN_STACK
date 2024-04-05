import React, { useEffect, useState } from "react";
import { useAuth } from '../store/auth';

export default function AdminHome() {
  const { autherizationToken } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [contactsCount, setContactsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  const getAllProjects = async () => {
    try {
      const URL = `https://mern-stack-server-nine.vercel.app/api/admin/projects`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: autherizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProjectsCount(data.length);
      }
    } catch (error) {
      console.log("Something went wrong while fetching projects!!");
    }
  };

  const getAllUsers = async () => {
    try {
      const URL = `https://mern-stack-server-nine.vercel.app/api/admin/users`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: autherizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserCount(data.length);
      } else {
        console.log("Something went wrong while fetching");
      }
    } catch (error) {
      console.log("Something went wrong while fetching users", error);
    }
  };

  const getAllContacts = async () => {
    try {
      const URL = `https://mern-stack-server-nine.vercel.app/api/admin/contacts`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: autherizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContactsCount(data.length);
      } else {
        console.log("Something went wrong while fetching contacts for admin");
      }
    } catch (error) {
      console.log(
        "Something went wrong while fetching contacts for admin",
        error
      );
    }
  };

  useEffect(() => {
    getAllProjects();
    getAllContacts();
    getAllUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      <div className="p-4 bg-[#31363F] text-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Projects </h2>
        <p className="text-3xl font-bold">{projectsCount}</p>
      </div>
      <div className="p-4 bg-[#31363F] text-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Users </h2>
        <p className="text-3xl font-bold">{userCount}</p>
      </div>
      <div className="p-4 bg-[#31363F] text-white  rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Contacts </h2>
        <p className="text-3xl font-bold">{contactsCount}</p>
      </div>
    </div>
  );
}

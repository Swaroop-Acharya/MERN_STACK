import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export default function AdminHome() {
  const { autherizationToken } = useAuth();
  const [counts, setCounts] = useState({
    userCount: 0,
    contactsCount: 0,
    projectsCount: 0,
  });

  const fetchData = async () => {
    try {
      const [usersResponse, contactsResponse, projectsResponse] =
        await Promise.all([
          fetch(`https://mern-stack-server-nine.vercel.app/api/admin/users`, {
            method: "GET",
            headers: { Authorization: autherizationToken },
          }),
          fetch(
            `https://mern-stack-server-nine.vercel.app/api/admin/contacts`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: autherizationToken,
              },
            }
          ),
          fetch(
            `https://mern-stack-server-nine.vercel.app/api/admin/projects`,
            { method: "GET", headers: { Authorization: autherizationToken } }
          ),
        ]);

      if (usersResponse.ok && contactsResponse.ok && projectsResponse.ok) {
        const [usersData, contactsData, projectsData] = await Promise.all([
          usersResponse.json(),
          contactsResponse.json(),
          projectsResponse.json(),
        ]);
        setCounts({
          userCount: usersData.length,
          contactsCount: contactsData.length,
          projectsCount: projectsData.length,
        });
      } else {
        console.log("Something went wrong while fetching data");
      }
    } catch (error) {
      console.log("Something went wrong while fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      <div className="p-4 bg-[#31363F] text-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Projects </h2>
        <p className="text-3xl font-bold">{counts.projectsCount}</p>
      </div>
      <div className="p-4 bg-[#31363F] text-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Users </h2>
        <p className="text-3xl font-bold">{counts.userCount}</p>
      </div>
      <div className="p-4 bg-[#31363F] text-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Contacts </h2>
        <p className="text-3xl font-bold">{counts.contactsCount}</p>
      </div>
    </div>
  );
}

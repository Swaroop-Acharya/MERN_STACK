import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { autherizationToken } = useAuth();

  const fetchAllUsers = async () => {
    try {
      const URL = "http://localhost:5000/api/admin/users";
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: autherizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.log("Something went wrong while fetching");
      }
    } catch (error) {
      console.log("Something went wrong while fetching users", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="overflow-hidden h-96 overflow-y-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">isAdmin</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

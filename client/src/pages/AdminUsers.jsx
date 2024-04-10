import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { autherizationToken } = useAuth();

  const fetchAllUsers = async () => {
    try {
      const URL = "https://mern-stack-server-nine.vercel.app/api/admin/users";
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
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  const deleteUser = async (userId) => {
    setIsLoading(true); // Set loading state to true before deletion
    try {
      const URL = `https://mern-stack-server-nine.vercel.app/api/admin/users/delete/${userId}`;
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization: autherizationToken,
        },
      });
      const data = await response.json();

      toast(data.message);
      if (response.ok) {
        fetchAllUsers();
      }
    } catch (error) {
      console.log("Something went wrong while deleting the user", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []); // Fetch data only once on component mount

  return (
    <div className="overflow-hidden text-white">
      <h1 className="text-3xl p-3">Users List</h1>
      {isLoading ? ( // Display loading indicator while fetching or deleting
        <div className="flex justify-center items-center h-80">
          <ReactLoading type={"spin"} color={"white"} height={50} width={50} />
        </div>
      ) : (
        <div className="overflow-hidden bg-[#31363F] h-96 overflow-y-auto rounded">
          <table className="table-auto w-full rounded">
            <thead className="overflow-none rounded border-b border-slate-400  ">
              <tr>
                <th className="px-4 pt-4 pb-4 py-2">Username</th>
                <th className="px-4 pt-4 pb-4 py-2">Email</th>
                <th className="px-4 pt-4 pb-4 py-2">Phone</th>
                <th className="px-4 pt-4 pb-4 py-2">isAdmin</th>
                <th className="px-4 pt-4 pb-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b text-center border-slate-400 px-4 pt-4 pb-4 py-2"
                >
                  <td className=" px-4 pt-4 pb-4 py-2">{user.username}</td>
                  <td className=" px-4 pt-4 pb-4 py-2">{user.email}</td>
                  <td className=" px-4 pt-4 pb-4 py-2">{user.phone}</td>
                  <td className=" px-4 pt-4 pb-4 py-2">
                    {user.isAdmin ? "Yes" : "No"}
                  </td>
                  <td className="px-4 pt-4 pb-4 py-2 flex justify-evenly">
                    <Link
                      to={`/admin/users/${user._id}/edit`}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

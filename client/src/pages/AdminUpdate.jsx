import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AdminUpdate() {
    const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const { autherizationToken } = useAuth();
  const params = useParams();
  const getSingleUser = async () => {
    try {
      const URL = `http://localhost:5000/api/admin/users/${params.id}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: autherizationToken,
        },
      });
      const data = await response.json();
      toast(data.message);
      
      setUserData(data.message);
    } catch (error) {
      console.log("Something went wrong while fetching the single user", error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
    console.log(userData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: autherizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      console.log(data);
      toast("Updated success");
      navigate("/admin/users")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center text-white items-center">
      <main>
        <section className="flex-1 p-4">
          <div>
            <h1 className="text-5xl">Edit the user</h1>
          </div>
        </section>
        <section className="flex-1 p-4">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  onChange={handleInput}
                  value={userData.username}
                  id="username"
                  name="username"
                  className="mt-1 p-2 text-black w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={handleInput}
                  value={userData.email}
                  id="email"
                  name="email"
                  className="mt-1 p-2 text-black w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-300"
                >
                  Phone
                </label>
                <input
                  type="phone"
                  onChange={handleInput}
                  value={userData.phone}
                  id="phone"
                  name="phone"
                  className="mt-1 text-black p-2 w-full border rounded-md"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

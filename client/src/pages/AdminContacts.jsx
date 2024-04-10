import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { autherizationToken } = useAuth();

  const getAllContacts = async () => {
    setIsLoading(true); // Set loading state to true before fetching contacts
    try {
      const URL = "https://mern-stack-server-nine.vercel.app/api/admin/contacts";
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: autherizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Contacts fetched for admin successfully", data);
        setContacts(data);
      } else {
        console.log("Something went wrong while fetching contacts for admin");
      }
    } catch (error) {
      console.log(
        "Something went wrong while fetching contacts for admin",
        error
      );
    } finally {
      setIsLoading(false); // Set loading state to false after fetching contacts
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const handleDeleteContact = async (id) => {
    setIsLoading(true); // Set loading state to true before deleting contact
    try {
      const URL = `https://mern-stack-server-nine.vercel.app/api/admin/contacts/delete/${id}`;
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization: autherizationToken,
        },
      });
      const data = await response.json();

      toast(data.message);
      if (response.ok) {
        getAllContacts();
      }
    } catch (error) {
      console.log("Something went wrong while deleting the contact", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-white p-3">List of Messages</h1>
      <div className="" style={{ height: "450px", overflowY: "auto" }}>
        {isLoading ? ( // Display loading indicator while fetching or deleting
          <div className="flex justify-center items-center h-80">
            <ReactLoading type={"spin"} color={"white"} height={50} width={50} />
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="mb-20px p-8 bg-[#31363F] text-white  mb-2 flex justify-between  rounded"
            >
              <div>
                <h4 className="text-xl font-bold">{contact.username}</h4>
                <p className="text-sm">{contact.email}</p>
                <p className="text-sm">{contact.message}</p>
              </div>
              <div>
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteContact(contact._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

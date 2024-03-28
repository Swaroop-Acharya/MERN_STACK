import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const { autherizationToken } = useAuth();
  const getAllContacts = async () => {
    try {
      const URL = "http://localhost:5000/api/admin/contacts";
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
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      const URL = `http://localhost:5000/api/admin/contacts/delete/${id}`;
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
        {contacts.map((contact) => (
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
        ))}
      </div>
    </>
  );
}

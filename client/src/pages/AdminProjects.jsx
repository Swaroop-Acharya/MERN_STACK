import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/store/auth";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { autherizationToken } = useAuth();

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
        setProjects(data);
      }
    } catch (error) {
      console.log("Something went wrong while fetching projects!!");
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true); // Set loading state to true before deletion
    try {
      const URL = `https://mern-stack-server-nine.vercel.app/api/admin/projects/delete/${id}`;
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization: autherizationToken,
        },
      });
      const data = await response.json();

      toast(data.message);
      if (response.ok) {
        getAllProjects();
      }
    } catch (error) {
      console.log("Something went wrong while deleting the user", error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <h1 className="text-3xl text-white mb-4">Manage Your Projects</h1>
        <Link
          to="/admin/projects/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Project
        </Link>
      </div>
      <div className="mt-8" style={{ height: "400px", overflowY: "auto" }}>
        {isLoading ? ( // Display loading indicator while fetching or deleting
          <div className="flex justify-center items-center h-64">
            <ReactLoading type={"spin"} color={"white"} height={50} width={50} />
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-[#31363F] text-white p-4 flex items-center justify-between rounded mb-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex  items-center gap-2">
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  <a
                    href={project.gitHubLink}
                    target="_blank"
                    className="block"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                </div>

                <div className="flex gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                <p className="text-slate-300 w-4/5 text-justify">
                  {project.description}
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to={`/admin/projects/${project._id}/edit`}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

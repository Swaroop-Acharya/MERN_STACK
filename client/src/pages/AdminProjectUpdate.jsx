import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { useParams } from "react-router-dom";
const AdminProjectUpdate = () => {
  const { autherizationToken } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState({
    name: "",
    description: "",
    techStack: "",
    gitHubLink: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const getSingleProject = async () => {
    try {
      console.log(params.id);
      const URL = `http://localhost:5000/api/admin/projects/${params.id}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: autherizationToken,
        },
      });
      const data = await response.json();
      toast(data.message);
      console.log(data.message);

      setProject(data.message);
    } catch (error) {
      console.log(
        "Something went wrong while fetching the single project",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(project)
      // const techStackArray = project.techStack
      //   .split(",")
      //   .map((tech) => tech.trim());

      // const modifiedObject = {
      //   ...project,
      //   techStack: techStackArray,
      // };
      const response = await fetch(
        `http://localhost:5000/api/admin/projects/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: autherizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        }
      );

      const data = await response.json();
      console.log(data);
      toast("Updated success");
      navigate("/admin/projects");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProject();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-white text-2xl my-3">Edit Project</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="Enter project name"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Enter project description"
            className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="techStack"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tech Stack
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={project.techStack}
            onChange={handleChange}
            placeholder="Enter tech stack (comma-separated)"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gitHubLink"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            GitHub Link
          </label>
          <input
            type="text"
            id="gitHubLink"
            name="gitHubLink"
            value={project.gitHubLink}
            onChange={handleChange}
            placeholder="Enter GitHub link"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectUpdate;

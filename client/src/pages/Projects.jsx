import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";
import ReactLoading from "react-loading";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const fetchData = async () => {
    try {
      const URL = `https://mern-stack-server-nine.vercel.app/api/data/projects`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        setIsLoading(false); // Set loading status to false after fetching data
      }
    } catch (error) {
      console.log("Unable to fetch projects" + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Display loading indicator while fetching data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type={"spin"} color={"#000"} height={50} width={50} />
      </div>
    );
  }

  return (
    <section className="container mx-auto mt-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow-md flex flex-col p-6 gap-2 rounded-lg"
          >
            <div className="flex gap-4 items-center ">
              <div>
                <h2 className="text-xl font-semibold ">{project.name}</h2>
              </div>
              <div>
                <a
                  href={project.gitHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:underline"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="mb-4">
              <div className="list-disc flex gap-3 list-inside">
                {project.techStack.map((tech, index) => (
                  <Badge key={index}>{tech}</Badge>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4 text-justify">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

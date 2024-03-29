import React, { useEffect ,useState} from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const fetchData = async () => {
    try {
      const URL = "http://localhost:5000/api/data/projects";
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProjects(data);
      }
    } catch (error) {
      console.log("Unable to fetch projects" + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mx-auto mt-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{project.name}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <div className="mb-4">
              <strong>Tech Stack:</strong>
              <ul className="list-disc list-inside">
                {project.techStack.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <a
              href={project.gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub Link
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

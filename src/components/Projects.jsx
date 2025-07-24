import { useState } from "react";
import { useCVData } from "../contexts/CVDataContext";
import "./Projects.css";

function Projects() {
  const { projects, setProjects } = useCVData();
  const [isEditing, setIsEditing] = useState(true);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: ""
  });

  const addProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({
        title: "",
        description: "",
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        image: ""
      });
    }
  };

  const removeProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2 className="projects-title">Projects & Portfolio</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? "Done Editing" : "Edit Projects"}
        </button>
      </div>

      {isEditing && (
        <div className="projects-form">
          <h3 className="form-title">Add New Project</h3>
          <div className="form-grid">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={newProject.title}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <input
              type="text"
              name="technologies"
              placeholder="Technologies used (e.g., React, Node.js)"
              value={newProject.technologies}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <input
              type="url"
              name="liveUrl"
              placeholder="Live Demo URL (optional)"
              value={newProject.liveUrl}
              onChange={handleInputChange}
              className="form-input"
            />
            
            <input
              type="url"
              name="githubUrl"
              placeholder="GitHub URL (optional)"
              value={newProject.githubUrl}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <textarea
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleInputChange}
            rows="3"
            className="form-textarea"
          />
          
          <button
            onClick={addProject}
            className="add-button"
          >
            Add Project
          </button>
        </div>
      )}

      {/* Projects Display */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              {isEditing && (
                <button
                  onClick={() => removeProject(project.id)}
                  className="delete-button"
                >
                  ×
                </button>
              )}
            </div>
            
            <p className="project-description">{project.description}</p>
            
            {project.technologies && (
              <div className="project-technologies">
                <span className="technology-label">Technologies: </span>
                <span className="technology-tags">{project.technologies}</span>
              </div>
            )}
            
            <div className="project-links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link live-demo"
                >
                  <svg className="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link github"
                >
                  <svg className="link-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !isEditing && (
        <div className="empty-state">
          <p>No projects added yet. Click "Edit Projects" to add your portfolio.</p>
        </div>
      )}
    </div>
  );
}

export default Projects;

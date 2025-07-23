import { useState } from "react";
import "../styles/Experience.css";

function Experience() {
  const [isEditing, setIsEditing] = useState(true);
  const [exp, setExp] = useState({
    company: "",
    position: "",
    responsibilities: "",
    from: "",
    until: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setExp({ ...exp, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <div className="experience">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={exp.company}
            onChange={handleChange}
          />
          <input
            type="text"
            name="position"
            placeholder="Position Title"
            value={exp.position}
            onChange={handleChange}
          />
          <textarea
            name="responsibilities"
            placeholder="Main Responsibilities"
            value={exp.responsibilities}
            onChange={handleChange}
          />
          <input
            type="text"
            name="from"
            placeholder="From"
            value={exp.from}
            onChange={handleChange}
          />
          <input
            type="text"
            name="until"
            placeholder="Until"
            value={exp.until}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h3>{exp.company}</h3>
          <p>{exp.position}</p>
          <p>{exp.responsibilities}</p>
          <p>{exp.from} - {exp.until}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Experience;

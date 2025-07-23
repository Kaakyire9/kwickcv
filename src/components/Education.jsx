import { useState } from "react";
import "../styles/Education.css";

function Education() {
  const [isEditing, setIsEditing] = useState(true);
  const [edu, setEdu] = useState({ school: "", title: "", date: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setEdu({ ...edu, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <div className="education">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="school"
            placeholder="School Name"
            value={edu.school}
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title of Study"
            value={edu.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="date"
            placeholder="Date of Study"
            value={edu.date}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h3>{edu.school}</h3>
          <p>{edu.title}</p>
          <p>{edu.date}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Education;

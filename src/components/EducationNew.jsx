import { useState } from "react";

function Education() {
  const [isEditing, setIsEditing] = useState(true);
  const [educationList, setEducationList] = useState([]);
  const [currentEdu, setCurrentEdu] = useState({ 
    school: "", 
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
    description: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCurrentEdu({ ...currentEdu, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentEdu.school && currentEdu.degree) {
      setEducationList([...educationList, { ...currentEdu, id: Date.now() }]);
      setCurrentEdu({ 
        school: "", 
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: ""
      });
    }
  }

  function removeEducation(id) {
    setEducationList(educationList.filter(edu => edu.id !== id));
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isEditing ? "Done Editing" : "Edit Education"}
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <h3 className="font-semibold mb-4 text-gray-700">Add Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="school"
              value={currentEdu.school}
              placeholder="School/University Name"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="degree"
              value={currentEdu.degree}
              placeholder="Degree (e.g., Bachelor's, Master's)"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="field"
              value={currentEdu.field}
              placeholder="Field of Study"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="gpa"
              value={currentEdu.gpa}
              placeholder="GPA (optional)"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="startDate"
              value={currentEdu.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="endDate"
              value={currentEdu.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="description"
            value={currentEdu.description}
            placeholder="Description, achievements, relevant coursework..."
            onChange={handleChange}
            rows="3"
            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            Add Education
          </button>
        </form>
      )}

      {/* Education List Display */}
      <div className="space-y-4">
        {educationList.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="text-blue-600 font-medium">{edu.school}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  {(edu.startDate || edu.endDate) && (
                    <span>
                      {edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                    </span>
                  )}
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-700 font-bold ml-4"
                >
                  ×
                </button>
              )}
            </div>
            {edu.description && (
              <p className="text-gray-600 mt-2">{edu.description}</p>
            )}
          </div>
        ))}
      </div>

      {educationList.length === 0 && !isEditing && (
        <div className="text-center py-8 text-gray-500">
          <p>No education entries added yet. Click "Edit Education" to add your educational background.</p>
        </div>
      )}
    </div>
  );
}

export default Education;

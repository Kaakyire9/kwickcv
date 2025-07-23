import { useState } from "react";

function Experience() {
  const [isEditing, setIsEditing] = useState(true);
  const [experienceList, setExperienceList] = useState([]);
  const [currentExp, setCurrentExp] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    responsibilities: "",
    achievements: ""
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setCurrentExp({ 
      ...currentExp, 
      [name]: type === 'checkbox' ? checked : value 
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentExp.company && currentExp.position) {
      setExperienceList([...experienceList, { ...currentExp, id: Date.now() }]);
      setCurrentExp({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        responsibilities: "",
        achievements: ""
      });
    }
  }

  function removeExperience(id) {
    setExperienceList(experienceList.filter(exp => exp.id !== id));
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isEditing ? "Done Editing" : "Edit Experience"}
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <h3 className="font-semibold mb-4 text-gray-700">Add Work Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              value={currentExp.company}
              placeholder="Company Name"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="position"
              value={currentExp.position}
              placeholder="Job Title/Position"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="location"
              value={currentExp.location}
              placeholder="Location (City, State)"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="current"
                checked={currentExp.current}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">Current Position</label>
            </div>
            <input
              type="date"
              name="startDate"
              value={currentExp.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!currentExp.current && (
              <input
                type="date"
                name="endDate"
                value={currentExp.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
          
          <textarea
            name="responsibilities"
            value={currentExp.responsibilities}
            placeholder="Key responsibilities and duties..."
            onChange={handleChange}
            rows="3"
            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <textarea
            name="achievements"
            value={currentExp.achievements}
            placeholder="Major achievements and accomplishments..."
            onChange={handleChange}
            rows="3"
            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button 
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            Add Experience
          </button>
        </form>
      )}

      {/* Experience List Display */}
      <div className="space-y-6">
        {experienceList.map((exp) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                <p className="text-blue-600 font-medium">{exp.company}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  {exp.location && <span>{exp.location}</span>}
                  {(exp.startDate || exp.endDate) && (
                    <span>
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {exp.current ? ' Present' : (exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : '')}
                    </span>
                  )}
                  {exp.current && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Current</span>
                  )}
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500 hover:text-red-700 font-bold ml-4"
                >
                  ×
                </button>
              )}
            </div>
            
            {exp.responsibilities && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-1">Key Responsibilities:</h4>
                <p className="text-gray-600 text-sm">{exp.responsibilities}</p>
              </div>
            )}
            
            {exp.achievements && (
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Achievements:</h4>
                <p className="text-gray-600 text-sm">{exp.achievements}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {experienceList.length === 0 && !isEditing && (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience added yet. Click "Edit Experience" to add your professional background.</p>
        </div>
      )}
    </div>
  );
}

export default Experience;

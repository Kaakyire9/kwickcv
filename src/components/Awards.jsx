import { useState } from "react";

function Awards() {
  const [isEditing, setIsEditing] = useState(true);
  const [awards, setAwards] = useState([]);
  const [newAward, setNewAward] = useState({
    title: "",
    issuer: "",
    date: "",
    description: ""
  });

  const handleInputChange = (e) => {
    setNewAward({ ...newAward, [e.target.name]: e.target.value });
  };

  const addAward = () => {
    if (newAward.title.trim() && newAward.issuer.trim()) {
      setAwards([...awards, { ...newAward, id: Date.now() }]);
      setNewAward({
        title: "",
        issuer: "",
        date: "",
        description: ""
      });
    }
  };

  const removeAward = (id) => {
    setAwards(awards.filter(award => award.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg animate-scale-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Awards & Achievements
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 transform hover:scale-105"
        >
          {isEditing ? "Done Editing" : "Edit Awards"}
        </button>
      </div>

      {isEditing && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6 animate-fade-in">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Add Award</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Award Title"
              value={newAward.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="issuer"
                placeholder="Issuing Organization"
                value={newAward.issuer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              
              <input
                type="date"
                name="date"
                value={newAward.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            
            <textarea
              name="description"
              placeholder="Award description or achievement details..."
              value={newAward.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            
            <button
              onClick={addAward}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 transform hover:scale-105"
            >
              Add Award
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {awards.map((award) => (
          <div key={award.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
            <div className="flex justify-between items-start ml-4">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 21l5.25-1.4L12 17l3.75 2.6L21 16l-2-5h-3l-4-6-4 6H5l-2 5z"/>
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{award.title}</h3>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{award.issuer}</p>
                {award.date && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(award.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                )}
                {award.description && (
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{award.description}</p>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => removeAward(award.id)}
                  className="text-red-500 hover:text-red-700 font-bold ml-4 transform hover:scale-110 transition-all duration-200"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {awards.length === 0 && !isEditing && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No awards added yet. Click "Edit Awards" to add your achievements.</p>
        </div>
      )}
    </div>
  );
}

export default Awards;

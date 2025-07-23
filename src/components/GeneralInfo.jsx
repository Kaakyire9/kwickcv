import { useState } from "react";

function GeneralInfo() {
  const [isEditing, setIsEditing] = useState(true);
  const [info, setInfo] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    profilePhoto: ""
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setInfo({ ...info, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Personal Information</h2>
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 transition duration-200 transform hover:scale-105"
        >
          {isEditing ? "Preview" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Photo Upload */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto mb-4 border-4 border-gray-300 border-dashed rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                {photoPreview || info.profilePhoto ? (
                  <img 
                    src={photoPreview || info.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm text-gray-500">Add Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-sm text-gray-500">Click to upload profile photo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={info.name}
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <input
              type="email"
              name="email"
              value={info.email}
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <input
              type="tel"
              name="phone"
              value={info.phone}
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="location"
              value={info.location}
              placeholder="Location (City, State)"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              name="website"
              value={info.website}
              placeholder="Website/Portfolio URL"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              name="linkedin"
              value={info.linkedin}
              placeholder="LinkedIn Profile"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              name="github"
              value={info.github}
              placeholder="GitHub Profile"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            />
          </div>
          
          <textarea
            name="summary"
            value={info.summary}
            placeholder="Professional summary or objective..."
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Information
          </button>
        </form>
      ) : (
        <div className="text-center">
          {/* Profile Photo Display */}
          {info.profilePhoto && (
            <div className="mb-4">
              <img 
                src={info.profilePhoto} 
                alt="Profile" 
                className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg border-4 border-blue-100"
              />
            </div>
          )}
          
          {info.name && <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{info.name}</h3>}
          
          <div className="space-y-2 mb-4">
            {info.email && (
              <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {info.email}
              </p>
            )}
            {info.phone && (
              <p className="text-gray-600 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {info.phone}
              </p>
            )}
            {info.location && (
              <p className="text-gray-600 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {info.location}
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-4">
            {info.website && (
              <a href={info.website} target="_blank" rel="noopener noreferrer" 
                 className="text-blue-500 hover:text-blue-700 transition duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </a>
            )}
            {info.linkedin && (
              <a href={info.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:text-blue-800 transition duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {info.github && (
              <a href={info.github} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-700 hover:text-gray-900 transition duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>

          {info.summary && (
            <div className="text-left">
              <h4 className="font-semibold text-gray-700 mb-2">Professional Summary</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{info.summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GeneralInfo;

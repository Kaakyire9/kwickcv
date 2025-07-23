import { useState } from "react";

function Certifications() {
  const [isEditing, setIsEditing] = useState(true);
  const [certifications, setCertifications] = useState([]);
  const [newCert, setNewCert] = useState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: ""
  });

  const handleInputChange = (e) => {
    setNewCert({ ...newCert, [e.target.name]: e.target.value });
  };

  const addCertification = () => {
    if (newCert.name.trim() && newCert.issuer.trim()) {
      setCertifications([...certifications, { ...newCert, id: Date.now() }]);
      setNewCert({
        name: "",
        issuer: "",
        date: "",
        expiryDate: "",
        credentialId: "",
        credentialUrl: ""
      });
    }
  };

  const removeCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg animate-scale-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Certifications
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-700 transition duration-200 transform hover:scale-105"
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6 animate-fade-in">
          <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Add Certification</h3>
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Certification Name"
              value={newCert.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            
            <input
              type="text"
              name="issuer"
              placeholder="Issuing Organization"
              value={newCert.issuer}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                name="date"
                placeholder="Issue Date"
                value={newCert.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              
              <input
                type="date"
                name="expiryDate"
                placeholder="Expiry Date (optional)"
                value={newCert.expiryDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            
            <input
              type="text"
              name="credentialId"
              placeholder="Credential ID (optional)"
              value={newCert.credentialId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            
            <input
              type="url"
              name="credentialUrl"
              placeholder="Credential URL (optional)"
              value={newCert.credentialUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            
            <button
              onClick={addCertification}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 transform hover:scale-105"
            >
              Add Certification
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">{cert.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{cert.issuer}</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {cert.date && (
                    <span>Issued: {new Date(cert.date).toLocaleDateString()}</span>
                  )}
                  {cert.expiryDate && (
                    <span className="ml-3">Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  )}
                </div>
                {cert.credentialId && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID: {cert.credentialId}</p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-500 hover:text-blue-700 text-sm transition duration-200"
                  >
                    View Credential →
                  </a>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="text-red-500 hover:text-red-700 font-bold ml-4 transform hover:scale-110 transition-all duration-200"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {certifications.length === 0 && !isEditing && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No certifications added yet. Click "Edit" to add your certifications.</p>
        </div>
      )}
    </div>
  );
}

export default Certifications;

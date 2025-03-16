import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-render-backend-url.onrender.com';

// Privacy Policy Component
function Privacy() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-6 text-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-red-400">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
            <p className="text-gray-300">
              We collect email addresses solely for the purpose of name extraction. 
              No personal data is stored permanently on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Data Usage</h2>
            <p className="text-gray-300">
              Extracted names are processed in real-time and immediately discarded 
              after generating the requested output. We never share your data with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Third-Party Services</h2>
            <p className="text-gray-300">
              We use LinkedIn API for profile validation. Their privacy policy can be 
              found at <a href="https://www.linkedin.com/legal/privacy-policy" 
              className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                LinkedIn's Privacy Policy
              </a>.
            </p>
          </section>

          <div className="mt-8 border-t border-gray-700 pt-4">
            <Link to="/" className="text-red-400 hover:text-red-300">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function MainApp() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [linkedinInput, setLinkedinInput] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [linkedinLoading, setLinkedinLoading] = useState(false);

  const processEmails = async () => {
    try {
      const emails = input.split(/[\n,]+/).map(e => e.trim()).filter(e => e);
      const response = await axios.post(`${API_BASE_URL}/api/process-emails`, { emails });
      setResults(response.data.results);
      setError('');
    } catch (err) {
      setError('Error processing emails. Please check your input.');
      setResults([]);
    }
  };

  const processLinkedIn = async () => {
    try {
      setLinkedinLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/process-linkedin`, { 
        linkedinUrl: linkedinInput 
      });
      setProfileData(response.data);
    } catch (error) {
      setProfileData(null);
      alert(error.response?.data?.error || 'Failed to fetch LinkedIn profile');
    } finally {
      setLinkedinLoading(false);
    }
  };

  const downloadCSV = (data, filename) => {
    const csvContent = data.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 
          transform perspective-1000
          animate-float
          bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent
          drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]
          hover:-translate-y-1 hover:drop-shadow-[0_10px_20px_rgba(255,0,0,0.7)]
          transition-all duration-500">
          Email Name Extractor
        </h1>

        {/* LinkedIn Profile Lookup Section */}
        <div className="bg-gray-800 rounded-xl mb-8 border-2 border-blue-700 shadow-[0_20px_50px_rgba(0,0,255,0.2)]">
          <div className="relative z-10 p-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={linkedinInput}
                onChange={(e) => setLinkedinInput(e.target.value)}
                placeholder="Enter LinkedIn profile URL"
                className="flex-1 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg 
                         text-gray-100 placeholder-gray-400 focus:outline-none 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50
                         transition-all duration-200"
              />
              <button
                onClick={processLinkedIn}
                disabled={linkedinLoading}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold 
                          rounded-lg transform transition-all duration-200 
                          hover:-translate-y-1 active:translate-y-0
                          border-b-4 border-blue-800 hover:border-blue-900
                          shadow-lg hover:shadow-xl shadow-blue-900/30
                          active:border-b-2 active:mt-[2px] disabled:opacity-50"
              >
                {linkedinLoading ? 'PROCESSING...' : 'LINKEDIN LOOKUP'}
              </button>
            </div>

            {profileData && (
              <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-blue-500">
                <div className="flex items-center gap-4">
                  {profileData.profilePicture && (
                    <img
                      src={profileData.profilePicture}
                      alt="Profile"
                      className="w-16 h-16 rounded-full border-2 border-blue-500"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-100">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                    <p className="text-gray-300">{profileData.jobTitle}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      Verified Profile
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email Processing Section */}
        <div className="bg-gray-800 rounded-xl 
          border-2 border-gray-700
          shadow-[0_20px_50px_rgba(255,_0,_0,_0.3)]
          transform perspective-1000
          hover:shadow-[0_30px_60px_rgba(255,0,0,0.5)]
          transition-all duration-500
          relative
          before:absolute before:inset-0 before:bg-red-500/10 before:rounded-xl
          after:absolute after:inset-0 after:border after:border-red-300/10 after:rounded-xl">
          
          <div className="absolute inset-0 rounded-xl pointer-events-none 
            shadow-[inset_0_0_30px_rgba(255,0,0,0.2)]" />

          <div className="relative z-10 p-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter emails separated by commas or new lines"
              rows={10}
              className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-lg 
                       text-gray-100 placeholder-gray-400 focus:outline-none 
                       focus:border-red-500 focus:ring-2 focus:ring-red-500/50
                       transition-all duration-200"
            />
            
            <div className="flex justify-center mt-4">
              <button
                onClick={processEmails}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold 
                          rounded-lg transform transition-all duration-200 
                          hover:-translate-y-1 active:translate-y-0
                          border-b-4 border-red-800 hover:border-red-900
                          shadow-lg hover:shadow-xl shadow-red-900/30
                          active:border-b-2 active:mt-[2px]"
              >
                PROCESS EMAILS
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-950/50 border border-red-500 rounded-lg 
                            text-red-300 flex items-center gap-2">
                <span className="text-red-500">❌</span>
                {error}
              </div>
            )}

            {results.length > 0 && (
              <div className="mt-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                  <h2 className="text-2xl font-semibold text-gray-200">Results</h2>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => downloadCSV(results.map(r => r.firstName), 'first_names.csv')}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white 
                               rounded-md transition-all duration-200 border-b-2 
                               border-red-800 hover:border-red-900 shadow-lg
                               active:translate-y-[1px] active:border-b-0"
                    >
                      ⬇️ First Names
                    </button>
                    <button
                      onClick={() => downloadCSV(results.map(r => r.lastName), 'last_names.csv')}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white 
                               rounded-md transition-all duration-200 border-b-2 
                               border-red-800 hover:border-red-900 shadow-lg
                               active:translate-y-[1px] active:border-b-0"
                    >
                      ⬇️ Last Names
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border-2 border-gray-700 shadow-xl">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-red-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-red-400 uppercase tracking-wider">First Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-red-400 uppercase tracking-wider">Last Name</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {results.map((result, index) => (
                        <tr key={index} className="hover:bg-gray-750 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{result.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 font-semibold">{result.firstName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 font-semibold">{result.lastName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t-2 border-red-900/50">
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  About
                </h3>
                <p className="text-gray-400 text-sm">
                  Extract first and last names from email addresses instantly. 
                  Perfect for quick contact list management and data processing.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://github.com/SumitRodrigues" 
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/sumit-rodrigues/" 
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" 
                      className="text-gray-400 hover:text-red-400 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Contact
                </h3>
                <p className="text-gray-400 text-sm">
                  Have questions? Reach out to us:
                </p>
                <p className="text-red-400 text-sm">
                  sumitrod11@gmail.com
                </p>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-red-400 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-red-400 transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-red-900/50 text-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Email Name Extractor. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}

export default App;

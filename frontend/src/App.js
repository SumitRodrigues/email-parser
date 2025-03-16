import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const processEmails = async () => {
    try {
      const emails = input.split(/[\n,]+/).map(e => e.trim()).filter(e => e);
      const response = await axios.post('http://localhost:5001/api/process-emails', { emails });
      setResults(response.data.results);
      setError('');
    } catch (err) {
      setError('Error processing emails. Please check your input.');
      setResults([]);
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Email Name Parser</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter emails separated by commas or new lines"
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 placeholder:text-gray-400"
          />
          
          <button
            onClick={processEmails}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Process Emails
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Results</h2>
                <div className="space-x-3">
                  <button
                    onClick={() => downloadCSV(results.map(r => r.firstName), 'first_names.csv')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Download First Names
                  </button>
                  <button
                    onClick={() => downloadCSV(results.map(r => r.lastName), 'last_names.csv')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Download Last Names
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.firstName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.lastName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
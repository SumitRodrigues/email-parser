// src/components/Privacy.js
import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
          <p className="text-gray-600">
            We collect email addresses solely for the purpose of name extraction. 
            No personal data is stored permanently on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Data Usage</h2>
          <p className="text-gray-600">
            Extracted names are processed in real-time and immediately discarded 
            after generating the requested output.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Third-Party Services</h2>
          <p className="text-gray-600">
            We use LinkedIn API for profile validation. Their privacy policy can be 
            found at <a href="https://www.linkedin.com/legal/privacy-policy" 
            className="text-blue-500 hover:underline">linkedin.com/legal/privacy-policy</a>.
          </p>
        </section>

        <p className="text-gray-500 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
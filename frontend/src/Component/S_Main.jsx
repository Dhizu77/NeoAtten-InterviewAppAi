import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MainContent() {
  const [jobDescription, setJobDescription] = useState("");

  const handleInputChange = (event) => {
    setJobDescription(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent p-4 sm:p-6">
        <div className="text-center bg-transparent">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 text-center sm:text-left sm:ml-0 md:mr-8">
            Input your Job Description to simulate Job Interview
            </h1>
            <div className="mt-8 sm:mt-10 flex flex-col items-center bg-transparent">
            <input
                type="text"
                className="w-full max-w-[300px] sm:max-w-[450px] md:max-w-[650px] lg:max-w-[850px] px-3.5 py-2.5 text-sm text-gray-900 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter job description"
                value={jobDescription}
                onChange={handleInputChange}
                style={{marginRight:'auto'}}
            />

            <Link
                to="/action"
                state={{ jobDescription }} // Passing state here
                className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{marginRight:'auto'}}
            >
                Start Now!
            </Link>
            </div>
        </div>
    </div>
  );
}

export default MainContent;

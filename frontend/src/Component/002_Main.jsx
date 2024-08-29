function main_content() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent">
        <div className="text-center bg-transparent">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Input your Job Description to simulate Job Interview
            </h1>

            <div className="mt-10 flex flex-col items-center bg-transparent">
            <input
                type="text"
                className="w-full max-w-[850px] px-3.5 py-2.5 text-sm text-gray-900 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter job description"
            />

            <button
                className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ marginRight: "auto" }}
            >
                Start Now!
            </button>
            </div>
        </div>
        </div>

    );
  }
  
  export default main_content
  
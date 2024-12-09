import Navbar from "../Component/H_Header";
import Harry from "../assets/harry.jpg"
import CopyRight from "../Component/HSA_Footer";

function Home_Page(){
    return(
<div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500">
  <Navbar />
  
  {/* HOME */}
  <div id="home" className="flex flex-col justify-center items-start min-h-screen px-8 py-16 bg-transparent font-poppins">
    <h5 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2">
      Hello, welcome to
    </h5>
  
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
      ExpressInEnglish
    </h1>
  
    <p className="text-lg sm:text-xl text-gray-100 mb-6">
      Start expressing yourself in English today and take the next step toward fluency!
    </p>
  
    <a
      href="/start"
      className="mt-4 rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      Start Now!
    </a>
  </div>

  {/* About Us */}
  <div id="about-us" className="min-h-screen px-4 sm:px-8 lg:px-16 xl:px-32 py-12 bg-transparent font-poppins">
    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">About Us</h1>
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        <strong className="text-teal-600">ExpressInEnglish</strong> is a platform dedicated to helping you enhance your English communication skills in a fun, interactive way. Whether you want to improve your vocabulary, practice sentence structure, or express your thoughts and emotions freely, we’ve got you covered. Here, you can engage in personalized exercises, explore various activities, and build confidence as you learn. No pressure, just a space to grow at your own pace. Start expressing yourself today and take the next step toward fluency!
      </p>
    </div>
  </div>

  {/* Teams */}
  <h1 id="teams" className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Our Teams</h1>
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-center">
      {/* Team Member Card */}
      {/* Repeat the card for additional team members */}
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
        <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 p-6 text-center rounded-lg shadow-lg">
          <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 mb-4 flex items-center justify-center rounded-full">
            <img
              src={Harry}
              alt="Team Member"
              className="object-cover w-[200px] h-[200px] rounded-full border-4 border-orange-400"
            />
          </div>
          <h3 className="text-lg font-semibold text-white">Harry Sanjaya</h3>
          <p className="text-sm text-gray-200">Human Being</p>
        </div>
      </div>
    </div>
  </div>


  {/* Footer Section */}
  <footer className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500">
    <p className="text-sm text-gray-100">
      &copy; 2024 ExpressInEnglish. All rights reserved.
    </p>
  </footer>
</div>
      
    );
}

export default Home_Page;
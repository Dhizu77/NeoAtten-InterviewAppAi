import Navbar from "../Component/H_Header";
import ChatGPTLogo from "../assets/ChatGPT_logo.png";
import Harry from "../assets/harry.jpg"
import CopyRight from "../Component/HSA_Footer";

function Home_Page(){
    return(
        <div className="bg-white bg-gradient-to-r from-purple-300 via-pink-200 to-white opacity-90">
            <Navbar/>
            
            {/* HOME */}
            <div id="home" className="flex flex-col justify-center items-start min-h-screen px-8">
                <h5 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                    Hello, welcome to
                </h5>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4">
                    InterNeo.Ai
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-700 mb-6">
                    Experience Tailored Job Interview Simulations - Focused Practice with Customized Questions to Enhance Your Interview Skills!
                </p>
                
                <a
                    href="/start"
                    className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Start Now!
                </a>
            </div>

            {/* About Us */}
            <div id="about-us" className="min-h-screen px-4 sm:px-8 lg:px-16 xl:px-32 py-12 bg-transparent">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">About Us</h1>
                <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                    <p className="text-lg text-gray-700 leading-relaxed text-justify">
                        <strong className="text-indigo-600">NeoAtten</strong> is dedicated to empowering individuals to overcome interview challenges by providing a platform for realistic, real-time interview simulations. Our mission is to support those who may feel anxious or unprepared by offering a tool to practice with customized questions and voice interactions. Founded with a vision to enhance talent growth among Indonesian youth, we utilize cutting-edge technology, including fine-tuned GPT-3.5, to offer personalized and adaptive practice experiences. Our platform is designed to mimic real interview scenarios, helping users build confidence, improve their communication skills, and prepare effectively for any interview situation. With features that allow users to receive feedback on their performance, NeoAtten aims to be the go-to resource for anyone looking to polish their interview skills, whether they are fresh graduates or experienced professionals looking to advance their careers. We are committed to continuously improving our platform and adapting to the evolving needs of our users, ensuring that they are always prepared to make a lasting impression in their interviews.
                    </p>
                </div>
            </div>

            {/* Features */}
            <h1 id="features" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">Features</h1>
            <div className="flex justify-center items-center px-4 sm:px-8 lg:px-16 xl:px-32 py-12 bg-transparent">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl">
                {/* Gambar */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                <img 
                    src= {ChatGPTLogo}
                    alt="Feature" 
                    className="object-cover w-[300px] h-[300px]"
                />
                </div>
                {/* Teks */}
                <div className="w-full md:w-1/2 p-4 flex items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Fine-Tuned Chat GPT-3-5</h2>
                    <p className="text-gray-700 text-justify">Leverage the power of fine-tuned GPT-3.5 to prepare for your interviews with customized questions and feedback. Our AI adapts to your job role and experience level, providing personalized practice that aligns with real-world interview scenarios. Whether you're refining technical skills or mastering behavioral questions, this feature ensures your preparation is precise and relevant.</p>
                </div>
                </div>
            </div>
            </div>

            {/* Teams */}
            <h1 id="teams" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">Teams</h1>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center">
                    {/* Team Member Card */}
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="bg-white p-6 text-center rounded-lg shadow-lg">
                            <div className="bg-pink-300 mb-4 flex items-center justify-center">
                            <img 
                            src= {Harry}
                            alt="Team" 
                            className="object-cover w-full h-full"
                            />
                            </div>
                            <h3 className="text-lg font-semibold">Team's Name</h3>
                            <p className="text-sm text-gray-600">Team's Bidang</p>
                        </div>
                    </div>
                    {/* Repeat the card for additional team members */}
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="bg-white p-6 text-center rounded-lg shadow-lg">
                            <div className="bg-pink-300 mb-4 flex items-center justify-center">
                            <img 
                            src= {Harry}
                            alt="Team" 
                            className="object-cover w-full h-full"
                            />
                            </div>
                            <h3 className="text-lg font-semibold">Team's Name</h3>
                            <p className="text-sm text-gray-600">Team's Bidang</p>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="bg-white p-6 text-center rounded-lg shadow-lg">
                            <div className="bg-pink-300 mb-4 flex items-center justify-center">
                            <img 
                            src= {Harry}
                            alt="Team" 
                            className="object-cover w-full h-full"
                            />
                            </div>
                            <h3 className="text-lg font-semibold">Team's Name</h3>
                            <p className="text-sm text-gray-600">Team's Bidang</p>
                        </div>
                    </div>
                </div>
            </div>


            <CopyRight/>
        </div>
    );
}

export default Home_Page;
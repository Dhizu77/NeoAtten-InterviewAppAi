import React, { useState, useEffect } from 'react';
import CopyRight from '../Component/HSA_Footer.jsx';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Navbar from '../Component/SA_Header.jsx';


function ActionPage() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const location = useLocation();
  const { jobDescription, BahasaInterview } = location.state;
  const [language, setLanguage] = useState('id-ID');
  const [voice, setVoice] = useState(null);
  useEffect(() => {
    if (BahasaInterview === "Indonesia") {
      setLanguage('id-ID'); // Set to id-IDn
    } else {
      setLanguage('en-IN'); // Set to English (or any other default language code you prefer)
    }
  }, [BahasaInterview]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const voices = synth.getVoices();
      let selectedVoice;
      if (language === 'id-ID') {
        // Choose Indonesian voice
        selectedVoice = voices.find(v => v.lang === 'id-ID');
      } else {
        // Choose English voice
        selectedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
      }
      setVoice(selectedVoice);
    };
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, [language]);

  const {transcript, browserSupportsSpeechRecognition, resetTranscript} = useSpeechRecognition();
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [isRecording, setIsRecording] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('');

  const initialConversation = [
    {
      role: "system",
      content: `
This interview will be conducted in ${BahasaInterview}. You are a friendly interviewer for a company with a job description as ${jobDescription || "No job description available"}. Your task is to assess candidates by asking relevant and frequent questions and testing their knowledge in their field. Start with an introduction, then proceed to their experience, technical skills, and problem-solving abilities. Ensure you challenge them with scenario-based questions. Conclude by asking if they have any questions for you.

1. **Language**: Conduct the entire interview in the specified language (${BahasaInterview}) without switching to another language at any point.

2. **STOP Condition**: If the interview cannot continue for any reason, immediately output the string "STOP" and terminate the interview without any additional farewell or extra statements.

3. **Focus**: Stay within the scope of the job description provided (${jobDescription || "No job description available"}) and assess the candidate's suitability based on that.

Remember:
- Use the language specified ${BahasaInterview} throughout the entire interview.
- Only output the string "STOP" if the interview needs to end prematurely, without any other text or context.
`
    }
  ];

  const [conversationHistory, setConversationHistory] = useState(initialConversation);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

  const startListening = (lang) => {
    setLanguage(lang);
    SpeechRecognition.startListening({ continuous: true, language: lang });
    setIsRecording(true);
  };

  const stopListening=()=>{
    SpeechRecognition.stopListening();
    handleSendToApi()
    setIsRecording(false)
  }
  const speakText = (text) => {
    if (!voice) return; // Prevent speaking if no voice is selected

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendToApi = async () => {
    if (interviewEnded) {
      return;
    }
    try {
      let newConversation = [...conversationHistory];
      if (!interviewStarted) {
        setInterviewStarted(true);
      } else {
        newConversation.push({ role: "user", content: transcript });
      }
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "ft:gpt-3.5-turbo-1106:personal::A1tMavrf",
        messages: newConversation,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }, {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json'
        }
      });
      const apiResponse = response.data.choices[0].message.content;
      if (apiResponse.includes("STOP")) {
        setInterviewEnded(true);
      }
      // Update the current message to show the latest response
      setCurrentMessage(apiResponse);
      setConversationHistory([...newConversation, { role: "assistant", content: apiResponse }]);
      resetTranscript();
      speakText(apiResponse);
    } catch (error) {
      console.error("Error communicating with API:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') { // Space to start/stop recording
        event.preventDefault();
        isRecording ? stopListening() : startListening(language);
      } else if (event.key === 'Enter') { // Enter to send message
        handleSendToApi();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRecording, language]);

  return (
    <>
      <div className='bg-white bg-gradient-to-r from-purple-300 via-pink-200 to-white opacity-90 min-h-screen flex flex-col'>
        <Navbar />
          <div className='flex-grow'>
                {!interviewStarted? (
                  <>
                    <div className='flex items-center justify-center min-h-screen'>
                      <button onClick={handleSendToApi}
                        className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Start Interview
                      </button>
                    </div>
                  </>
                ):(
                <>
                  <div className='mt-[80px] flex-grow'>
                  {!interviewEnded &&(
                    <>
                    <div className='flex justify-end'>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="mt-4 mr-4 ml-4 rounded-md bg-white border border-gray-300 px-1 py-2 text-sm font-normal text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                      <option value="en-IN">English</option>
                      <option value="id-ID">Indonesia</option>
                    </select>
                    </div>


                    <div className='mt-4'>
                      <p className='font-bold text-indigo-600 ml-4 '>Interviewer :</p>
                      <div className='bg-white p-3 rounded-md shadow-md w-3/4 mt-1 ml-6'>
                        <p className='text-gray-900 font-semibold text-justify'>{currentMessage}</p> {/* Display only the current message */}
                      </div>
                    </div>

                    <div className='mt-4'>
                      <p className='font-bold text-indigo-600 text-right mr-4'>You :</p>
                      <div className='bg-white p-3 rounded-md shadow-md ml-auto w-3/4 mt-1 mr-6'>
                        <p className=' text-gray-900 font-semibold text-justify'>{transcript}</p>
                      </div>
                    </div>
                    </>
                  )}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col space-y-2 items-center">
                  {!interviewEnded && (
                    <>
                    <div className="relative inline-block">
                      <button 
                        onClick={() => {
                          if (isRecording) {
                            stopListening();
                          } else {
                            startListening(language);
                          }
                        }}
                        onMouseEnter={() => {
                          const tooltip = document.createElement('div');
                          tooltip.innerText = 'Press Space for Start/Stop, Press Enter for Send Message';
                          tooltip.className = 'absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-black text-white rounded whitespace-nowrap';
                          document.querySelector('.tooltip-anchor').appendChild(tooltip);

                          setTimeout(() => {
                            if (tooltip) tooltip.remove();
                          }, 3000);
                        }}
                        className={`tooltip-anchor rounded-full p-3 text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isRecording ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'} transition-colors duration-300`}
                        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                      >
                        {isRecording ? (
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 384 512" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="40" d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 384 512" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="40" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div>
                    
                    </div>
                    </>
                  )}
                  </div>
                  </div>
                </>
                )}
                {interviewEnded && (
                  <>
                  <div className='flex justify-center items-center mt-[240px]'>
                    <div className='text-center'>
                      <div className='p-4'>
                        <p className="text-red-600 text-lg">Interview sudah berakhir!</p>
                      </div>

                      <div>
                        <a href='/start'
                          className="rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Mulai Kembali
                        </a>
                      </div>

                    </div>
                  </div>
                  </>
                )}  
          </div>
      </div>

      <div className='bg-white bg-gradient-to-r from-purple-300 via-pink-200 to-white opacity-90'>
        <CopyRight />
      </div>
    </>
  );
}

export default ActionPage;

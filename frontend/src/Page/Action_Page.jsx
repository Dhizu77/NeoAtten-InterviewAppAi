import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Navbar from '../Component/SA_Header.jsx';
import { Navigate } from 'react-router-dom';


function ActionPage() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const [language, setLanguage] = useState('en');
  const [voice, setVoice] = useState(null);
  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const voices = synth.getVoices();
      let selectedVoice;
      selectedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
      setVoice(selectedVoice);
    };
  
    // If voices are already loaded, we call loadVoices right away
    if (synth.getVoices().length > 0) {
      loadVoices();
    }
  
    // Listen for the voiceschanged event in case voices load asynchronously
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, [language]);  

  const {transcript, browserSupportsSpeechRecognition, resetTranscript} = useSpeechRecognition();
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [isRecording, setIsRecording] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('');
  const promptAja = 
  `Imagine you're talking to a close friend who is always there to listen. You are the kind of friend who is attentive, supportive, and non-judgmental. You respond with a warm, gentle, and empathetic voice. Your goal is to provide comfort, listen without interrupting, and offer wise advice when needed. You speak as if you're right next to the person, offering reassurance and confidence. Your tone is casual yet caring, making the listener feel valued and heard. Make the conversation feel natural, unhurried, full of understanding, and giving a sense of calm and ease.`;

  const initialConversation = [
    {
      role: "system",
      content: promptAja
    }
  ];

  const [conversationHistory, setConversationHistory] = useState(initialConversation);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

  const startListening = (lang) => {
    setLanguage(lang);
    console.log
    SpeechRecognition.startListening({ continuous: true, language: lang });
    setIsRecording(true);
  };

  const stopListening=()=>{
    SpeechRecognition.stopListening();
    resetTranscript();
    stopCurrentSpeech();
    handleSendToApi();
    setIsRecording(false);
  }

  const speakText = (text) => {
    if (!voice) return; // Prevent speaking if no voice is selected
  
    // Stop any ongoing speech to prevent overlap
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
  
    // Add an event listener to handle speech errors
    utterance.onerror = (e) => {
      console.error('SpeechSynthesisUtterance error:', e);
    };
  
    window.speechSynthesis.speak(utterance);
  };
    
  const handleSendToApi = async () => {
    if (interviewEnded) return;
    if (interviewEnded) setInterviewEnded(false);
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
  
      // Ensure text is spoken after the response is updated
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

  const stopCurrentSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Menghentikan suara yang sedang diputar
    }
  };
  
  return (
    <>
<div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 opacity-90 min-h-screen flex flex-col">
  <Navbar />
  <div className="flex-grow">
    {!interviewStarted ? (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <button
            onClick={handleSendToApi}
            className="mt-4 rounded-md bg-orange-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300"
          >
            Start Chatting!
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="mt-[80px] flex-grow">
          {!interviewEnded && (
            <div className="max-w-6xl m-auto">
              <div className="mt-4">
                <p className="font-bold text-indigo-600 ml-4">ChatBot :</p>
                <div className="bg-[#F3F8FF] p-3 rounded-xl shadow-md w-2/3 mt-1 ml-6">
                  <p className="text-gray-900 font-semibold text-justify">
                    {currentMessage}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-bold text-indigo-600 text-right mr-4">You :</p>
                <div className="bg-[#CAF4FF] p-3 rounded-xl shadow-md ml-auto w-2/3 mt-1 mr-6">
                  <p className="text-gray-900 font-semibold text-justify">
                    {transcript}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-row space-x-4 items-center">
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
                      tooltip.innerText = 'Press Space to Begin, and Press it again to Send';
                      tooltip.className =
                        'absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm bg-black text-white rounded whitespace-nowrap opacity-90 transition-all duration-300';
                      document.querySelector('.tooltip-anchor').appendChild(tooltip);

                      setTimeout(() => {
                        if (tooltip) tooltip.remove();
                      }, 2000);
                    }}
                    className={`tooltip-anchor rounded-full p-3 text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600'
                        : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    } transition-colors duration-300`}
                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                  >
                    {isRecording ? (
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 21.2-5.1 41.1-14.2 58.7L416 300.8 416 96c0-53-43-96-96-96s-96 43-96 96l0 54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128l0-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="#ffffff"
                          d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative inline-block">
                  <button
                    onClick={() => {
                      stopCurrentSpeech();
                      setInterviewEnded(true)
                      speakText('Thank you for using my service!');
                    }}
                    className="rounded-full p-3 bg-red-600 text-white shadow-md hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-300"
                    aria-label="End Interview">
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512">
                      <path
                        fill="#ffffff"
                        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM372.7 279.6c-10.7 0-19.6 8.9-19.6 19.6s8.9 19.6 19.6 19.6 19.6-8.9 19.6-19.6-8.9-19.6-19.6-19.6zM256 392c-75.1 0-136-60.9-136-136s60.9-136 136-136 136 60.9 136 136-60.9 136-136 136z" /> 
                    </svg> 
                  </button> 
                </div> 
              </> 
              )}
              {interviewEnded && (
                <div className="flex justify-center items-center min-h-screen">
                  <div className="text-center">
                    <div className="p-4">
                      <p className="text-white text-lg">Thank you for using my service!</p>
                    </div>

                    <div>
                      <a
                        href="/start"
                        className="rounded-md bg-orange-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Start Again!
                      </a>
                    </div>
                  </div>
                </div>
              )}
          </div> 
      </div> 
    </> 
    )}
 </div> 
</div>

</>

  );
}

export default ActionPage;
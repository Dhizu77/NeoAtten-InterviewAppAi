import React, { useState } from 'react';
import CopyRight from '../Component/HSA_Footer.jsx';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Navbar from '../Component/SA_Header.jsx';

function ActionPage() {
  // Menerima Input jobDescription dari halaman /start
  const location = useLocation();
  const { state } = location;
  const jobDescription = state?.jobDescription;

  // Melakukan voice recognition
  const [language, setLanguage] = useState('en-IN');
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }
  const startListening = (lang) => {
    setLanguage(lang);
    SpeechRecognition.startListening({ continuous: true, language: lang });
  };

  // Melakukan interview
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "system",
      content: `You are an interviewer for a company with job description as ${jobDescription || "No job description available"}. Your task is to assess candidates by asking frequent, relevant questions and testing their knowledge in their field. Start with an introduction, then dive into their experience, technical skills, and problem-solving abilities. Ensure you challenge them with scenario-based and knowledge-specific questions. Conclude by asking if they have any questions for you. and also if the interview can no longer continue, you can say to press the stop button.`
    }
  ]);
  const handleSendToApi = async () => {
    try {
      const newConversation = [...conversationHistory, { role: "user", content: transcript }];
      setConversationHistory(newConversation);

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
          'Authorization': '',
          'Content-Type': 'application/json'
        }
      });

      const apiResponse = response.data.choices[0].message.content;

      setConversationHistory([...newConversation, { role: "assistant", content: apiResponse }]);
      resetTranscript(); // Reset transcript for the next input
    } catch (error) {
      console.error("Error communicating with API:", error);
    }
  };

  return (
    <>
      <div className='bg-white bg-gradient-to-r from-purple-300 via-pink-200 to-white opacity-90 min-h-screen flex flex-col'>
        <Navbar/>
        <div className='mt-[80px] flex-grow'>
          <p>{jobDescription || "No job description available"}</p>
          <p>{transcript}</p>
          <div className='mt-4'>
            {conversationHistory.map((msg, index) => (
              <p key={index}><strong>{msg.role === "assistant" ? "Interviewer" : "You"}:</strong> {msg.content}</p>
            ))}
          </div>
          <div>
            <button onClick={() => startListening('en-IN')}
              className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              English
            </button>
            <button onClick={() => startListening('id-ID')}
              className="mt-4 ml-2 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              Indonesian
            </button>

            <br />
            <button onClick={SpeechRecognition.stopListening}
              className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Stop Listening
            </button>

            <button onClick={handleSendToApi}
              className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Send to API
            </button>
          </div>
        </div>
      </div>
      <div className='bg-white bg-gradient-to-r from-purple-300 via-pink-200 to-white opacity-90'>
        <CopyRight />
      </div>
    </>
  );
}

export default ActionPage;

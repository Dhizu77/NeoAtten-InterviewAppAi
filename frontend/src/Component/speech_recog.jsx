import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function SpeechRec() { 
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <p>Browser does not support speech recognition.</p>;
    }

    return (
        <>
            <div className='bg-fuchsia-200'>
                <p>{transcript}</p>
                <br />
                <button onClick={startListening}
                className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Start Listening
                </button>
                <br />
                <button onClick={SpeechRecognition.stopListening}
                className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Stop Listening
                </button>
            </div>
        </>
    );
}

export default SpeechRec;

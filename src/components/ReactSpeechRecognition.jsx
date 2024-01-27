import { IconButton } from '@material-tailwind/react';
import { useState } from 'react';
import { CiMicrophoneOff, CiMicrophoneOn } from 'react-icons/ci';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    const handleListening = () => {
        if(!listening){
            setIsListening(true);
            SpeechRecognition.startListening();
        }
        else{
            setIsListening(false);
            SpeechRecognition.stopListening();
        }
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <IconButton className="rounded-full text-white text-2xl p-[1rem] border-[1px] border-white" onClick={handleListening}>
                {!listening?(<CiMicrophoneOn />):(<CiMicrophoneOff />)}
            </IconButton>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
};
export default Dictaphone;
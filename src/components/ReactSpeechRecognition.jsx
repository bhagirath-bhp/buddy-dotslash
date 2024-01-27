import { IconButton } from '@material-tailwind/react';
import { useState } from 'react';
import { CiMicrophoneOff, CiMicrophoneOn } from 'react-icons/ci';
const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    const handleListening = () => {
        if(!listening){
            SpeechRecognition.startListening();
        }
        else{
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
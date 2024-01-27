import React, { useEffect, useRef, useState } from 'react';

const GeneratePitch = ({ audioUrl }) => {
  const audioRef = useRef();
  const [pitchData, setPitchData] = useState([]);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const getPitchData = () => {
      analyser.getByteFrequencyData(dataArray);
      
      // Your pitch detection logic goes here
      // This is just a placeholder to demonstrate updating pitchData
      const pitchData = Array.from(dataArray); // Example: convert array to pitch data
      setPitchData(pitchData);
    };

    const intervalId = setInterval(getPitchData, 100); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, []);
  console.log(pitchData)
  return (
    <div>
      <audio ref={audioRef} src={audioUrl} controls />
      <div>
        Pitch Data:
        <ul>
          {pitchData.map((pitch, index) => (
            <li key={index}>{pitch}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GeneratePitch;

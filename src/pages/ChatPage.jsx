import { IconButton, Option, Select } from "@material-tailwind/react";
import ChatItem from "../components/ChatItem";
import { VscSend } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import FloatingIcon from "../components/FloatingIcon";
import ProductSearch from "../components/ProductSearch";


const ChatPage = () => {
    const [companies, setCompanies] = useState([]);
    const chatContainerRef = useRef();
    const [prompt, setPrompt] = useState(" ");
    const [thinking, setThinking] = useState(true);
    const [chatComponentArray, setChatComponentArray] = useState([]);
    const companyRef = useRef();
    const CHATBOT_URI = "https://customized-chatbot.onrender.com";
    const DB_URI = "https://ultimatecc-strapi.onrender.com/api";
    const bearer = "5a2c40b8f8edf75a9877089261a42e0c16a257a3d18ace5af3297a4affd6ade0402a647251e8a08aba1bcb43d87484c0778fc96b9250fb03e9ad27f24f05d67a743f1fa1ea6148a57accf52e1542ef8a8ee93b9b203a57beb2ce0230490a3ce25f8bd1ea652c622e3cf390959cb818643ba2385eb53b52e99e45ecf25895ef2f"

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setPrompt(transcript)
    }, [transcript])

    useEffect(() => {
        async function fetchData() {
            const response = await axios
                .get(`${DB_URI}/companies?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${bearer}`
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            if (response && response.status === 200) {
                const companyNames = response.data.data.map(item => item.attributes.name);
                setCompanies(companyNames);
            }
        }
        fetchData();
    }, [])


    const updatePrompt = (e) => {
        setPrompt(e.target.value);
    };
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    const handleListening = () => {
        if (!listening) {
            SpeechRecognition.startListening();
        }
        else {
            console.log(transcript);
            SpeechRecognition.stopListening();
        }
    }
    const handleSubmit = async (event) => {
        setThinking(true)
        event.preventDefault();
        if (prompt.length > 0) {
            chatContainerRef.current.scrollTop = 0;
            const newChatComponentArray = [...chatComponentArray]; // Create a new array reference
            newChatComponentArray.push(<ChatItem
                key={Math.random() + Math.random()}
                type="sent"
                name="Jai Shree Ram"
                time="11:30 AM"
                message={prompt}
                imageURL="/images/dummy.jpg"
            />);
            try {
                const response = await axios.post(`${CHATBOT_URI}/ask`, {
                    sendQuery: prompt,
                });
                newChatComponentArray.push(<ChatItem
                    key={Math.random()}
                    type="received"
                    name="Jai Shree Ram"
                    time="11:30 AM"
                    message={response.data}
                    imageURL="/images/dummy.jpg"
                    interactivators={true}
                />);
            } catch (error) {
                setTimeout(() => {
                    setThinking(false)
                }, 1000);
                newChatComponentArray.push(<ChatItem
                    key={Math.random()}
                    type="received"
                    name="Jai Shree Ram"
                    time="11:30 AM"
                    message={error.message}
                    imageURL="/images/dummy.jpg"
                    interactivators={true}
                />);
            }
            setChatComponentArray(newChatComponentArray); // Update state with the new array
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const companiesOptionContainer = companies.map((item) => (
        <Option key={item}>{item}</Option>
    ));
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen py-[1rem]">
            <div className="nav flex justify-between w-full px-[3rem]">
                <div className="logo">UltimateCC</div>
                <div className="select-company">
                    <Select ref={companyRef}>
                        {companiesOptionContainer}
                    </Select>
                </div>
            </div>
            <div className="chat-area overflow-y-scroll h-[90%] w-[50%] noscrollbar flex flex-col" ref={chatContainerRef}>
                {!thinking ? chatComponentArray : <FloatingIcon />}
            </div>
            <form className="chat-form gap-4 flex w-[50%]" onSubmit={handleSubmit}>
                <input type="text" className="bg-transparent w-[80%] py-[.5rem] pl-[1rem] border-[1px] border-white rounded-lg" value={prompt} onChange={updatePrompt} />
                <IconButton className="rounded-full text-white text-2xl p-[1rem] border-[1px] border-white" onClick={handleListening}>
                    {!listening ? (<CiMicrophoneOn />) : (<CiMicrophoneOff />)}
                </IconButton>
                <IconButton className="rounded-full text-white text-2xl p-[1rem] border-[1px] border-white" type="submit">
                    <VscSend />
                </IconButton>
            </form>
            <ProductSearch />
        </div>
    );
};

export default ChatPage;

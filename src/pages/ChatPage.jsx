import { IconButton } from "@material-tailwind/react";
import ChatItem from "../components/ChatItem";
import Dictaphone from "../components/ReactSpeechRecognition";
import { VscSend } from "react-icons/vsc";
import { useState } from "react";
import axios from "axios";

const ChatPage = () => {
    const [prompt, setPrompt] = useState("");
    const [thinking, setThinking] = useState(false);
    const [chatComponentArray, setChatComponentArray] = useState([]);
    const CHATBOT_URI = "https://customized-chatbot.onrender.com";

    const updatePrompt = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (event) => {
        setThinking(true)
        event.preventDefault();
        if (prompt.length > 0) {
            setChatComponentArray([
                ...chatComponentArray,
                <ChatItem
                    key={Math.random()+Math.random()}
                    type="sent"
                    name="Jai Shree Ram"
                    time="11:30 AM"
                    message={prompt}
                    imageURL="/images/dummy.jpg"
                />
            ]);
            try {
                const response = await axios.post(`${CHATBOT_URI}/ask`, {
                    sendQuery: prompt,
                });
                setChatComponentArray([
                    ...chatComponentArray,
                    <ChatItem
                        key={Math.random()}
                        type="received"
                        name="Jai Shree Ram"
                        time="11:30 AM"
                        message={thinking?"thinking . . . ":response.data}
                        imageURL="/images/dummy.jpg"
                    />
                ]);
            } catch (error) {
                setChatComponentArray([
                    ...chatComponentArray,
                    <ChatItem
                        key={Math.random()}
                        type="received"
                        name="Jai Shree Ram"
                        time="11:30 AM"
                        message={error.message}
                        imageURL="/images/dummy.jpg"
                    />
                ]);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="nav"></div>
            <div className="chat-area overflow-y-scroll h-[90%] noscrollbar">
                {chatComponentArray}
            </div>
            <form className="chat-form gap-4 flex" onSubmit={handleSubmit}>
                <input type="text" className="bg-transparent py-[.5rem] border-[1px] border-white rounded-lg" onChange={updatePrompt} />
                <Dictaphone />
                <IconButton className="rounded-full text-white text-2xl p-[1rem] border-[1px] border-white" type="submit">
                    <VscSend />
                </IconButton>
            </form>
        </div>
    );
};

export default ChatPage;

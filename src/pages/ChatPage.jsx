import { IconButton } from "@material-tailwind/react";
import ChatItem from "../components/ChatItem";
import { CiMicrophoneOn } from "react-icons/ci";
import Dictaphone from "../components/ReactSpeechRecognition";
import { VscSend } from "react-icons/vsc";
import { useState } from "react";
import axios from "axios";

const ChatPage = () => {
    const [prompt, setPrompt] = useState("");
    const [chatComponentArray, setChatComponentArray] = useState([]);

    const updatePrompt = (e) => {
        setPrompt(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setChatComponentArray([
            ...chatComponentArray,
            <ChatItem 
                key={chatComponentArray.length} // Add key prop for each item in the array
                type="sent" 
                name="Jai Shree Ram" 
                time="11:30 AM" 
                message={prompt} 
                imageURL="/images/dummy.jpg" 
            />
        ]);
        if (prompt.length > 0) {
            // Add the new ChatItem to the existing array

            try {
                const response = await axios.post(`${import.meta.env.CHATBOT_URI}/ask`, {
                    sendQuery: prompt,
                });

                setChatComponentArray([
                    ...chatComponentArray,
                    <ChatItem 
                        key={chatComponentArray.length}
                        type="received" 
                        name="Jai Shree Ram" 
                        time="11:30 AM" 
                        message={response.data} 
                        imageURL="/images/dummy.jpg" 
                    />
                ]);
            } catch (error) {
                setChatComponentArray([
                    ...chatComponentArray,
                    <ChatItem 
                        key={chatComponentArray.length}
                        type="received" 
                        name="Jai Shree Ram" 
                        time="11:30 AM" 
                        message={error.message} 
                        imageURL="/images/dummy.jpg" 
                    />
                ]);
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="nav"></div>
            <div className="chat-area overflow-y-scroll h-[90%] noscrollbar">
                {chatComponentArray}
            </div>
            <form className="chat-form gap-4 flex" onSubmit={handleSubmit}>
                <input type="text" className="bg-transparent py-[.5rem] border-[1px] border-white rounded-lg" onChange={updatePrompt} />
                <IconButton className="rounded-full text-white text-2xl p-[1rem] border-[1px] border-white" onClick={handleSubmit}>
                    <CiMicrophoneOn />
                </IconButton>
                <IconButton className="rounded-full text-white text-2xl p-[1rem] border-[1px] border-white" type="submit">
                    <VscSend />
                </IconButton>
                {/* <Dictaphone/> */}
            </form>
        </div>
    );
}

export default ChatPage;

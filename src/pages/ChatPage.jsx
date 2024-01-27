import { IconButton } from "@material-tailwind/react"
import ChatItem from "../components/ChatItem"
import { CiMicrophoneOn } from "react-icons/ci";

const ChatPage = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="nav"></div>
            <div className="chat-area overflow-y-scroll h-[70%] noscrollbar">
                <ChatItem type="recieved" name="Jai Shree Ram" time="11:30 AM" message=" That's awesome. I think our users will really appreciate the improvements." imageURL="/images/dummy.jpg" />
                <ChatItem type="sent" name="Jai Shree Ram" time="11:30 AM" message=" That's awesome. I think our users will really appreciate the improvements." imageURL="/images/dummy.jpg" />
            </div>
            <div className="chat-form">
                <IconButton className="rounded-full text-white text-5xl p-[2rem] border-[1px] border-white">
                    <CiMicrophoneOn/>
                </IconButton>
            </div>
        </div>
    )
}

export default ChatPage
import { IconButton, Option, Select } from "@material-tailwind/react";
import ChatItem from "../components/ChatItem";
import { VscSend } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import FloatingIcon from "../components/FloatingIcon";
import GeneratePitch from "../components/GeneratePitch";
import { extractProductNames } from "../utils";


const ChatPage = () => {
    const [companies, setCompanies] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [responseProducts, setResponseProducts] = useState([]);
    const [companyProducts, setCompanyProducts] = useState([]);
    const [interactivators, setInteractivators] = useState([]);
    const chatContainerRef = useRef();
    const [currentCompany, setCurrentCompany] = useState("company A");
    const [prompt, setPrompt] = useState(" ");
    const [thinking, setThinking] = useState(false);
    const [chatComponentArray, setChatComponentArray] = useState([]);
    const componentArray = chatComponentArray
    const CHATBOT_URI = "https://ultimatecc-bs.onrender.com";
    // const CHATBOT_URI = "https://customized-chatbot.onrender.com";
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
                .get(`${DB_URI}/companies`, {
                    headers: {
                        Authorization: `Bearer ${bearer}`
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            // console.log(response.data.data)
            if (response.status === 200) {
                const companyNames = response.data.data.map(item => [item.attributes.name, item.id]);
                // const products = response.data.data.map(item => item.attributes)
                // console.log(products)
                setCompanies(companyNames);
                setCompanyData(response.data);

            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchCompanyData() {
            if (currentCompany) {
                const response = await axios.get(`${DB_URI}/companies?populate=*&filters[name][$eq]=${currentCompany}`, {
                    headers: {
                        Authorization: `Bearer ${bearer}`
                    }
                });
                setCompanyProducts(response.data.data[0].attributes.products);
            }
        }
        fetchCompanyData();
    }, [currentCompany])

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
            SpeechRecognition.stopListening();
        }
    }
    const handleSubmit = async (event) => {
        setThinking(true)
        event.preventDefault();
        event.target[0].value = "";
        if (prompt.length > 0) {
            chatContainerRef.scrollTop = 0;
            componentArray.push(<ChatItem
                key={Math.random() + Math.random()}
                type="sent"
                name="Jai Shree Ram"
                time="11:30 AM"
                message={prompt}
                imageURL="/images/dummy.jpg"
            />)
            const response = await axios
                .post(`${CHATBOT_URI}/ask`, {}, {
                    headers: {
                        "sendQuery": prompt,
                        "companyName": currentCompany
                    }
                })
                .catch((error) => {
                    // setTimeout(() => {
                    // }, 1000);
                    setThinking(false)
                    componentArray.push(<ChatItem
                        key={Math.random()}
                        type="recieved"
                        name="Jai Shree Ram"
                        time="11:30 AM"
                        message={error.message}
                        imageURL="/images/dummy.jpg"
                    />)
                })

            if (response.status === 200) {
                setThinking(false)
                const products = extractProductNames(response.data.response, companyProducts)
                products.forEach((item)=>{
                    const product1 = companyProducts.find(product => product.name === item);
                    console.log(product1)
                    setURLs([...urls, (product1.url || null)]);
                })
                componentArray.push(<ChatItem
                    key={Math.random()}
                    type="recieved"
                    name="Jai Shree Ram"
                    time="11:30 AM"
                    message={response.data.response}
                    imageURL="/images/dummy.jpg"
                    interactivators={{
                        images: false,
                        mail: false,
                        phone: false,
                        link: urls,
                    }}
                />)
                // console.log(products)
            }

            setChatComponentArray(componentArray)
            chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
        }
    };
    // console.log(urls);
    // console.log(companyProducts);
    // const companiesOptionContainer = companies.map((item) => (
    //     <Option key={item[1]} >{item[0]}</Option>
    // ))
    const companiesOptionContainer = companies.map((item) => (
        <option key={item[1]} className="text-black hover:bg-blue-gray-900">{item[0]}</option>
    ))
    const handleCompanyChange = (e) => {
        setCurrentCompany(e.target.value)
    }



    return (
        <div className="flex flex-col justify-center items-center w-full h-screen py-[1rem]">
            <div className="nav flex justify-between w-full px-[3rem]">
                <div className="logo">UltimateCC</div>
                <div className="select-company">
                    <select onChange={handleCompanyChange} className="bg-transparent rounded-lg border-[1px] border-white outline-none py-3 px-4">
                        {companiesOptionContainer}
                    </select>
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
            {/* <GeneratePitch audioUrl="/audio/sample.mp3"/> */}
        </div>
    );
};

export default ChatPage;

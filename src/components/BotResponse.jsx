import React from 'react'

const BotResponse = async () => {
    try {
        const response = await axios.post(`${CHATBOT_URI}/ask`, {
            sendQuery: prompt,
        });
        setChatComponentArray([
            ...chatComponentArray,
            <ChatItem
                key={Math.random()-234}
                type="received"
                name="Jai Shree Ram"
                time="11:30 AM"
                message={thinking ? "thinking . . . " : response.data}
                imageURL="/images/dummy.jpg"
            />
        ]);
    } catch (error) {
        setThinking(false)
        setChatComponentArray([
            ...chatComponentArray,
            <ChatItem
                key={Math.random()+234}
                type="received"
                name="Jai Shree Ram"
                time="11:30 AM"
                message={thinking ? "thinking . . . " : error.message}
                imageURL="/images/dummy.jpg"
            />
        ]);
    }

    return (
        <>

        </>
    )
}

export default BotResponse
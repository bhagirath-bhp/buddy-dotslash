import Interactivators from "./Interactivators"

const ChatItem = ({ type, name, time, message, imageURL, interactivators }) => {
    console.log(interactivators)
    let interactivatorSet;
    // if (interactivators)
    //     interactivatorSet = interactivators.map((item) => (
    //         <Interactivators data={
    //             {
    //                 images: interactivators.imageUrl || "d",
    //                 mail: interactivators.mail || "v",
    //                 phone: interactivators.phone || "a",
    //                 link: interactivators.link || "hello.coom"
    //             }
    //         } />
    // ))
    if (type === "recieved")
        return (
            <div className="flex items-start gap-2.5 my-5">
                <img className="w-8 h-8 rounded-full" src={imageURL} alt="Jese image" />
                <div className="flex flex-col">
                    <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-600">{name}</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{time}</span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 rounded-xl rounded-tl-none bg-blue-gray-900">
                            <p className="text-sm font-normal text-white">{message}</p>
                        </div>
                    </div>
                    <div className="interactive-items max-w-[300px]">
                        {/* {interactivatorSet ? interactivatorSet : ""} */}
                        <Interactivators data={
                            {
                                images: interactivators.imageUrl || "d",
                                mail: interactivators.mail || "v",
                                phone: interactivators.phone || "a",
                                link: interactivators.url || "hello.coom"
                            }
                        } />
                    </div>
                </div>
            </div>
        )
    else
        return (

            <div className="flex items-start justify-end gap-2.5 my-5 w-full">
                <div className="flex flex-col gap-1 max-w-[320px]">
                    <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-600">{name}</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{time}</span>
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 rounded-xl rounded-tr-none bg-blue-gray-900">
                        <p className="text-sm font-normal text-white">{message}</p>
                    </div>
                </div>
                <img className="w-8 h-8 rounded-full" src={imageURL} alt="Jese image" />
            </div>
        )


}

export default ChatItem
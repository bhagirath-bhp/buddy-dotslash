import { Link } from "react-router-dom"
import ParticlesLayer from "../components/ParticlesLayer"

const HomePage = () => {
    return (
        <>
            <div className='h-screen w-screen flex justify-center items-center relative'>
                <div className="h-[8rem] w-[8rem] z-[-99] rounded-full borderborder-transparent flex justify-center items-center cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow duration-[4000ms] blur"></div>
                <a href="/chat" className='h-[8rem] w-[8rem] z-[100] absolute bg-black border-[3px] rounded-full border-transparent flex justify-center items-center cursor-pointer'>
                    Start
                </a>
                <div className="relative right-[5%]">
                    <div className="absolute border-white border-[1px] rounded-full w-0 h-0 animate-expand a-delay-200 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></div>
                    <div className="absolute border-white border-[1px] rounded-full w-0 h-0 animate-expand a-delay-600 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></div>
                    <div className="absolute border-white border-[1px] rounded-full w-0 h-0 animate-expand a-delay-900 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></div>
                </div>
            </div>
            <ParticlesLayer />
        </>
    )
}

export default HomePage
import { FC } from "react";

interface LandingPageProps {
    scroll: () => void;
}

const LandingPage: FC<LandingPageProps> = ({ scroll }) => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-wrap">
                <div className="flex justify-center leading-[11em]">
                    <span className="text-primary font-bold text-[220px]">3</span>
                </div>
                <div className="flex flex-col font-extrabold justify-center leading-[5em]">
                    <span className="text-white text-[93px]">Daily</span>
                    <span className="text-primary text-[93px]">Questions</span>
                </div>
            </div>
            <div className="flex gap-6 flex-col">
                <div>
                    <div>
                        <span className="text-primary text-[52px]">ROAD TO <span className="text-white">PAPASA SA BOARD EXAM!</span></span>
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-primary px-[6em] cursor-pointer" onClick={scroll}>
                        <span className="font-bold text-[42px]">Start</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default LandingPage;


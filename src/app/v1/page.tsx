'use client';
import LandingPage from "@/components/LandingPage/page";
import Quizzes from "@/components/v1/Quizzes/page";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaHistory } from 'react-icons/fa';

export default function Home() {
  const quizzesRef = useRef<HTMLDivElement>(null);
  const [quizFullScreen, setQuizFullScreen] = useState(false);

  const scrollToQuizzes = () => {
    if (quizzesRef.current) {
      quizzesRef.current.scrollIntoView({ behavior: 'smooth' });
      setQuizFullScreen(true);
    }else{
      setQuizFullScreen(false)
    }
  };

  return (
    <div className="bg-secondary flex justify-center">
      <div className="flex flex-col min-h-screen sm:w-[1085px] w-[800px] relative">
        <div className="min-h-screen flex flex-col items-center justify-center  sm:p-24 p-[2em]">
          <LandingPage scroll={scrollToQuizzes} />
          <div className="flex  absolute top-0 right-0 py-10 cursor-pointer">
                <Link href="/history">
                  <div className="p-2">
                      <FaHistory size={26}/>
                  </div>
                </Link>
            </div>
        </div>
        <div ref={quizzesRef} className='min-h-screen flex flex-col items-center justify-center sm:p-24 p-[2em] relative '>
          <Quizzes />
        </div>
      </div>
    </div>
  );
}

'use client';
import { Button, ButtonGroup } from '@chakra-ui/react'
import LandingPage from "@/components/LandingPage/page";
import Quizzes from "@/components/Quizzes/page";
import { useEffect, useRef, useState } from "react";

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
      <div className="flex flex-col min-h-screen sm:w-[1085px] w-[800px]">
        <div className="min-h-screen flex flex-col items-center justify-center  sm:p-24 p-[2em]">
          <LandingPage scroll={scrollToQuizzes} />
        </div>
        <div ref={quizzesRef} className='min-h-screen flex flex-col items-center justify-center sm:p-24 p-[2em]'>
          <Quizzes />
        </div>
      </div>
    </div>
  );
}

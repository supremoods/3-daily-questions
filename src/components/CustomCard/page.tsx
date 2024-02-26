import { Card } from "@chakra-ui/react";
import { FC, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";


type ITEM = {
    question:string,
    attachment:string,
    choices: { [key: string]: string }, 
    answer:string,
    explanation: string
};

interface ItemProps {
    item : ITEM
}

interface ViewQuestion {
    view: (isView: boolean, index:number) => void; // Callback function type definition
  }

const CustomCard: FC<
    ItemProps & 
    { cardKey: number } & 
    ViewQuestion & 
    {isView: boolean} & 
    {show:(show:boolean)=>void} & 
    {open:boolean} &
    {hideAnswer:()=>void} &
    {answer:(choice:string, answer:string, index: number)=>void} &
    any
    > = 
    ({ 
        item, 
        cardKey, 
        view, 
        isView, 
        show, 
        open ,
        hideAnswer,
        answer,
        questionStatus
    }): JSX.Element => {

    const [showModal, setShowModal] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false)
    const [isCorrect, setCorrect] =  useState(false)
    const [hasSelected, setHasSelected] = useState(false)
    const handleView = () => {
        view(true, cardKey);
    };

    const toggleAnswer = () =>{
        console.log('open :>> ', open);
        if(open){
            setShowAnswer(false)
            hideAnswer()
        }else{
            setShowAnswer(true)
            show(!showModal)
        }   
    }
    return (
        <div className={`w-full  flex items-center ${isView ? 'min-h-screen':'h-full'}`}>
            <Card className={`w-full   h-full cursor-pointer ${isView ? 'm-h-[500px] justify-center flex items-center p-10' : 'p-4'}`} onClick={handleView}>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-2">
                        <span className="text-black sm:text-2xl text-sm">
                            {cardKey+1}. 
                        </span>
                        <div>
                            <pre className="question text-black sm:text-2xl text-sm whitespace-pre-wrap">
                                <div className="text-black" dangerouslySetInnerHTML={{ __html: item.question }} />
                            </pre>
                            {
                                item.attachment !== '' &&                  
                                <div className='flex m-h-[200px] w-[240px]'>
                                    <img src={item.attachment} className='object-fit h-full'/>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        isView && 
                        <div className="flex">
                                <div className="w-full grid grid-cols-2 gap-4">
                                    {
                                        ['A','B','C','D'].map((letter, index)=>(
                                            <Card 
                                            onClick={() => answer(letter, item.answer, cardKey)} 
                                            key={index} className={`!bg-indigo-50 hover:!bg-primary/50 hover:scale-95 transition-all flex flex-col h-24 justify-center items-center ${
                                                questionStatus['selected'] === letter.toLowerCase() ?
                                                    questionStatus[`q${cardKey}`] === true ? '!bg-green-300' : 
                                                    questionStatus[`q${cardKey}`] === false ? '!bg-red-300' : ''
                                                    : ` `
                                            }`}>{letter}</Card>
                                        )) 
                                    }
                                </div>
                        </div>
                    }
                 
                </div>
               
            </Card>

        </div>
        
    );
}


export default CustomCard
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
                            <pre className="text-black sm:text-2xl text-sm whitespace-pre-wrap">
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
                    <div className="flex flex-col gap-2">
                        {isView && Object.keys(item.choices)
                            .sort() // Sort the keys alphabetically
                            .map((choiceKey, index) => (
                                <div onClick={() => answer(choiceKey, item.answer, cardKey)} key={index}>
                                    <span className={`text-black flex gap-2 sm:text-2xl text-sm hover:text-primary  ${
                                        questionStatus['selected'] === choiceKey ?
                                            questionStatus[`q${cardKey}`] === true ? 'text-green-500' : 
                                            questionStatus[`q${cardKey}`] === false ? 'text-red-500' : ''
                                            : `${questionStatus['selected']}`
                                    }`}>
                                        <span  className={`text-black sm:text-2xl text-sm hover:text-primary flex ${
                                        questionStatus['selected'] === choiceKey ?
                                            questionStatus[`q${cardKey}`] === true ? 'text-green-500' : 
                                            questionStatus[`q${cardKey}`] === false ? 'text-red-500' : ''
                                            : `${questionStatus['selected']}`
                                    }`}>
                                          {choiceKey}: 
                                        </span>
                                        <div  className={`text-black sm:text-2xl text-sm hover:text-primary flex ${
                                        questionStatus['selected'] === choiceKey ?
                                            questionStatus[`q${cardKey}`] === true ? 'text-green-500' : 
                                            questionStatus[`q${cardKey}`] === false ? 'text-red-500' : ''
                                            : `${questionStatus['selected']}`
                                    }`} dangerouslySetInnerHTML={{ __html: item.choices[choiceKey] }} />

                                    </span>
                                </div>
                            
                            ))}
                    </div>

                    {
                        isView && 
                        <div>
                            <div onClick={toggleAnswer}>
                                <span className="text-primary sm:text-2xl text-sm ">Show Answer &#8594; </span>
                            </div>
                            {
                                (open && showAnswer) &&
                                <div>
                                    <span className="text-primary font-bold sm:text-2xl text-sm">{item.answer}</span>
                                    <div>
                                        <span className="text-black font-bold sm:text-xl text-[12px]">Explanation</span>
                                    </div>
                                    <div>
                                    <div className="text-black" dangerouslySetInnerHTML={{ __html: item.explanation }} />

                                    </div>
                                </div>
                            }
                        </div>
                  }
       
                </div>
               
            </Card>

        </div>
        
    );
}


export default CustomCard
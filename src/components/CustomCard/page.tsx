import { Card } from "@chakra-ui/react";
import { FC, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";


type ITEM = {
    question:string,
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
    {hideAnswer:()=>void}
    > = 
    ({ 
        item, 
        cardKey, 
        view, 
        isView, 
        show, 
        open ,
        hideAnswer
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
        <div className={`w-full ${isView ? 'min-h-screen':'h-full'}`}>
            <Card className={`w-full   h-full cursor-pointer ${isView ? 'm-h-[500px] justify-center flex items-center p-10' : 'p-4'}`} onClick={handleView}>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-2">
                        <span className="text-black text-2xl txt-based">
                            {cardKey+1}. 
                        </span>
                        <span className="text-black text-2xl txt-based">
                            {item.question}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {isView && Object.keys(item.choices)
                            .sort() // Sort the keys alphabetically
                            .map((choiceKey, index) => (
                                <div key={index}>
                                    <span className="text-black text-2xl txt-based">
                                        {choiceKey}: {item.choices[choiceKey]}
                                    </span>
                                </div>
                            ))}
                    </div>

                    {
                        isView && 
                        <div>
                            <div onClick={toggleAnswer}>
                                <span className="text-primary text-2xl txt-based">Show Answer &#8594; </span>
                            </div>
                            {
                                (open && showAnswer) &&
                                <div>
                                    <span className="text-primary font-bold text-2xl txt-based">{item.answer}</span>
                                    <div>
                                        <span className="text-black font-bold text-xl txt-sub">Explanation</span>
                                    </div>
                                    <div>
                                        <span className="text-black font-bold text-xl txt-sub">{item.explanation}</span>
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
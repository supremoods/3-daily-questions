'use client';
import { QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Card, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { IoMdArrowDropleft, IoMdArrowRoundBack } from "react-icons/io";


type ITEM = {
    explanation: string;
    attachment: string;
    question: string;
    choices: { [key: string]: string };
    answer: string;
    createdAt: string;
};


const History = () =>{
    const [items, setItems] = useState<ITEM[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const fetchItems = async () => {
        try {
            const itemsCollection = await collection(db, 'items');
            const unsubscribe = onSnapshot(itemsCollection, (querySnapshot: QuerySnapshot) => {
                const fetchedItems: ITEM[] = [];
            
                querySnapshot.forEach((doc) => {
                    const data = doc.data().item;
           
                    data.map((e: ITEM) => {
                        const newItem: ITEM = {
                            question: e.question || '',
                            attachment: e.attachment || '',
                            choices: e.choices || {},
                            answer: e.answer || '',
                            explanation: e.explanation || '',
                            createdAt: e.createdAt  // Set createdAt if not available
                        };
        
                        fetchedItems.push(newItem);
                    });
                    
                });
                
                setItems(fetchedItems);
            });
            
            // Don't forget to unsubscribe when the component unmounts
            return () => {
                unsubscribe();
            };
            
        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false);
            await fetchItems(); // Wait for fetchItems to complete before setting isLoading to false
            setIsLoaded(true);
        };
    
        fetchData();
    }, []);
    
    return (
        <div className="bg-secondary flex justify-center">
            <div className="flex flex-col min-h-screen sm:w-[1085px] w-[800px] relative p-10">
                <div className="fixed top-0 right-0 py-10 cursor-pointer">
                    <Link href="/">
                        <div className="bg-primary p-2 hover:bg-primary/90">
                            <IoMdArrowRoundBack size={26}/>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col gap-10">
                    <div>
                        <h1 className="text-primary text-4xl font-bold">History</h1>
                    </div>
                    {
                        !isLoaded ? 
                        <div className="flex flex-col gap-10">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index} className="p-4 bg-white border-r-8 rounded-lg">
                                    <Stack>
                                        <SkeletonText noOfLines={3} spacing='4' skeletonHeight='2' />
                                        <SkeletonText mt={5} noOfLines={4} spacing='4' skeletonHeight='2' width={200}/> 
                                        <SkeletonText mt={5} noOfLines={4} spacing='4' skeletonHeight='2' /> 
                                    </Stack>
                                </div>
                            ))}
                        </div> : 
                        <div className="flex flex-col gap-4">
                              {items.map((item: ITEM, index) => (
                                <div key={index} className="p-4 bg-white border-r-8 rounded-lg m-h-[500px] justify-center flex items-center ">
                                    <div className="flex flex-col gap-5">
                                        <div className="flex gap-2">
                                            <span className="text-black sm:text-2xl text-sm">
                                                {index+1}. 
                                            </span>
                                            <div>
                                                <span className="text-black sm:text-2xl text-sm">
                                                    {item.question}
                                                </span>
                                                {
                                                    item.attachment !== '' &&                  
                                                    <div className='flex m-h-[200px] w-[240px]'>
                                                        <img src={item.attachment} className='object-fit h-full'/>
                                                    </div>
                                                }
                            
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {Object.keys(item.choices)
                                                .sort() // Sort the keys alphabetically
                                                .map((choiceKey, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <span className="text-black sm:text-2xl text-sm">
                                                            {choiceKey}. 
                                                        </span>
                                                        <div>
                                                            <span className="text-black sm:text-2xl text-sm">
                                                                {item.choices[choiceKey]}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                ))}
                                        </div>
                                        <div>
                                            <span className="text-primary font-bold sm:text-2xl text-sm">Answer: {item.answer}</span>
                                            <div>
                                                <span className="text-black font-bold sm:text-xl text-[12px]">Explanation</span>
                                            </div>
                                            <div>
                                                <pre className="text-black font-bold sm:text-xl text-[12px] whitespace-pre-wrap">{item.explanation}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                              ))}
                              
                        </div>
                    
                    }
                </div>
            </div>
        </div>
    )
}

export default History;
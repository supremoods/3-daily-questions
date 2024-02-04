'use client';
import { useEffect, useRef, useState } from "react";
import CustomCard from "../CustomCard/page";
import { QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { BsArrowUpSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import { MdOutlineZoomInMap } from "react-icons/md";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

type ITEM = {
    explanation: string;
    question: string;
    choices: { [key: string]: string };
    answer: string;
};

const Quizzes = () => {
    const [items, setItems] = useState<ITEM[]>([]);
    const [viewCard, setViewCard] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0); // Index of the currently displayed card

    const [isOpen, setIsOpen] = useState(false);
    const [showAns, setShowAns] = useState(false);
    const onClose = () => setIsOpen(false);
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]); // Array to hold refs for questions

    const onShowAnswer = () => {
        // Your logic to show the answer goes here
        setShowAns(true);
        onClose(); // Close the modal after showing the answer
    };

    

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
                            choices: e.choices || {},
                            answer: e.answer || '',
                            explanation: e.explanation
                        };

                        fetchedItems.push(newItem);

                    })
                });
                setItems(fetchedItems);
            });

            return () => unsubscribe();
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    useEffect(() => {
        fetchItems()
    }, [items])

    const viewQuestion = (isView: boolean, index: number) => {
        setViewCard(isView);
    
    }
    
    const showModal = (isView: boolean) => {
        setIsOpen(isView);
    }


    const closeQuestion = () => {
        setViewCard(false);
    }
    const hideAnswer = () => {
        setShowAns(false);
    }

    const handleArrowUp = () => {
        if (currentIndex > 0) {
            const index = currentIndex - 1;
            const questionRef = questionRefs.current[index];
            if (questionRef) {
                questionRef.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                setCurrentIndex(index);
            }
        }else{
              // Scroll to the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            setCurrentIndex(0);
            setViewCard(false)
        }
    }
    
    const handleArrowDown = () => {
        if (currentIndex < items.length - 1) {
            const index = currentIndex + 1;
            const questionRef = questionRefs.current[index];
            if (questionRef) {
                questionRef.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                setCurrentIndex(index);
            }
        }
    }
    

    return (
        <div className={`flex flex-col gap-5 `}>
            {items.map((item: ITEM, index) => (
                <div 
                ref={(ref) => questionRefs.current[index] = ref}// Assigning ref dynamically
                key={index}
                className="w-full "

                >
                <CustomCard
                    hideAnswer={hideAnswer}
                    show={showModal}
                    view={viewQuestion}
                    item={item}
                    cardKey={index}
                    open={showAns}
                    isView={viewCard}
                />
                    </div>
               
            ))}
            {viewCard && (
                <div className="fixed top-0 right-0">
                    <div className="min-h-screen flex flex-col items-center justify-between p-10">
                        <div>
                            <MdOutlineZoomInMap className="cursor-pointer text-[3em]" onClick={closeQuestion} />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <BsArrowUpSquareFill className="cursor-pointer text-[3em] hover:text-[2.8em]" onClick={handleArrowUp} />
                            <BsArrowDownSquareFill className="cursor-pointer text-[3em]  hover:text-[2.8em]" onClick={handleArrowDown} />
                        </div>
                    </div>
                </div>
            )}


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <span className="text-primary text-xl">
                            Are you sure you want to show the answer?
                        </span>
                    </ModalHeader>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="ghost" onClick={onShowAnswer}>Show Answer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}

export default Quizzes;

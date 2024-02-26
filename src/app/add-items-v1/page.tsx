'use client';
import { Textarea, FormControl, FormLabel, Input, FormErrorMessage, FormHelperText, Button, Card } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import React from 'react';
import TextEditor from '@/components/TextEditor/page';

const itemsSchema = Yup.array().of(
    Yup.object().shape({
        question: Yup.string().required('Please provide a question'),
        a: Yup.string().required('Please provide possible answer A'),
        b: Yup.string().required('Please provide possible answer B'),
        c: Yup.string().required('Please provide possible answer C'),
        d: Yup.string().required('Please provide possible answer D'),
        answer: Yup.string().required('Please provide the correct answer')
    })
);

const questionnaire : any[] =  []

for(let i = 0; i < 3; i++){
    questionnaire.push(    
        {
            question: '',
            attachment: '',
            a: '',
            b: '',
            c: '',
            d: '',
            answer: '',
            explanation: '',
            attachmentsExplanation: []
        }
    )
}

const initialValues = {
    questionnaire: questionnaire.map(item => ({
        question: item.question,
        attachment: item.attachment,
        a: item.a,
        b: item.b,
        c: item.c,
        d: item.d,
        answer: item.answer,
        explanation: item.explanation,
    }))
};

const submit = async ()  => {
    console.log('questionnaire :>> ', questionnaire);
    const payload = questionnaire.map((e: any) => ({
        question: e.question,
        attachment: e.attachment,
        choices: {
            a: e.a,
            b: e.b,
            c: e.c,
            d: e.d
        },
        answer: e.answer,
        explanation: e.explanation,
        createdAt: new Date()
    }));

    console.log('payload :>> ', payload);

    const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(payload)
    })

}


const AddItems = () =>{
    return (
        <>
            <div className="flex flex-col bg-secondary  min-h-screen p-24">

            <Formik
                initialValues={initialValues}
                validationSchema={itemsSchema}
                onSubmit={submit}
            >
                    {props => (
                        <Form className='flex flex-col gap-10'>
                            {questionnaire.map((question, index) => (
                                <Card key={index} className='p-10 flex gap-6'>
                                    
                                    <FormLabel id={`questionnaire[${index}].question`} className='text-primary'>Question</FormLabel>
                                    <TextEditor 
                                        onEditorChange={(content)=>{
                                            console.log('content :>> ', content);
                                            questionnaire[index].question = content}} id={`ques${index}`
                                        } 
                                        initVal='Input question' height={300}
                                    />

                                    <div className='w-3/6'>
                                        {['a', 'b', 'c', 'd'].map((choice, choiceIndex) => (
                                            <>
                                                <FormLabel className='text-primary'>{choice}</FormLabel>
                                                <TextEditor onEditorChange={
                                                    (content)=>(questionnaire[index][`${choice}`] = content)
                                                    } 
                                                    id={`questionnaire[${index}].${choice}`} 
                                                    initVal='Input choices' 
                                                    height={300}
                                                />
                                            </>
                                             
                                        ))}
                                    </div>

                               
                                    <FormLabel className='text-primary'>Answer</FormLabel>
                                    <Input
                                        onChange={(event) => (questionnaire[index].answer = event.target.value)}
                                        className=' text-black'
                                        placeholder="Input the answer"
                                    ></Input>
                
                                    <FormLabel className='text-primary'>Explanation</FormLabel>
                                    <TextEditor onEditorChange={(content)=>(questionnaire[index].explanation = content)} id={`questionnaire[${index}.explanation]`} initVal='Input choices' height={300}></TextEditor>
                                 
                                </Card>
                            ))}

                            {/* Add Submit Button here */}
                            <Button 
                                type="submit"
                                isLoading={props.isSubmitting}
                            >Submit</Button>
                        </Form>
                    )}
                </Formik>

                                
            </div>
        </>        
    )
}

export default AddItems;
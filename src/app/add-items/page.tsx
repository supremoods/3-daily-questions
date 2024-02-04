'use client';
import { Textarea, FormControl, FormLabel, Input, FormErrorMessage, FormHelperText, Button, Card } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import React from 'react';

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




const questionnaire =  [
    {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        answer: '',
        explanation: ''
    },
    {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        answer: '',
        explanation: ''
    },
    {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        answer: '',
        explanation: ''
    }
]
const initialValues = {
    questionnaire: questionnaire.map(item => ({
        question: item.question,
        a: item.a,
        b: item.b,
        c: item.c,
        d: item.d,
        answer: item.answer,
        explanation: item.explanation,
    }))
};

const submit = async (value: any)  => {
    console.log('value :>> ', value);

    const payload = value.questionnaire.map((e: any) => ({
        question: e.question,
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
                                    <Field name={`questionnaire[${index}].question`}>
                                        {({ field, form }: any) => (
                                            <FormControl isRequired>
                                                <FormLabel className='text-primary'>Question {index + 1}</FormLabel>
                                                <Textarea
                                                    {...field}
                                                    resize="none"
                                                    placeholder="Input your question ..."
                                                    className=' text-black'
                                                ></Textarea>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <div className=' w-96'>
                                        {['a', 'b', 'c', 'd'].map((choice, choiceIndex) => (
                                            <Field key={`${index}-${choice}`} name={`questionnaire[${index}].${choice}`}>
                                                {({ field, form }: any) => (
                                                    <FormControl isRequired key={`${index}-${choice}`}>
                                                        <FormLabel className='text-primary'>{choice}</FormLabel>
                                                        <Input
                                                            className='w-10 text-black'
                                                            {...field}
                                                            resize="none"
                                                            placeholder={`Input option ${choice.toUpperCase()}...`}
                                                        ></Input>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        ))}
                                    </div>

                                    <Field name={`questionnaire[${index}].answer`}>
                                        {({ field, form }: any) => (
                                            <FormControl isRequired>
                                                <FormLabel className='text-primary'>Answer</FormLabel>
                                                <Input
                                                    className=' text-black'
                                                    {...field}
                                                    placeholder="Input the answer"
                                                ></Input>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name={`questionnaire[${index}.explanation]`}>
                                        {({ field, form }: any) => (
                                            <FormControl isRequired>
                                                <FormLabel className='text-primary'>Explanation</FormLabel>
                                                <Textarea
                                                    className=' text-black'
                                                    {...field}
                                                    placeholder="Input the explanation"
                                                ></Textarea>
                                            </FormControl>
                                        )}    
                                    </Field>
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
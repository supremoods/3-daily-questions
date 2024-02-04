import { NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'

export async function GET(){

  try {
    return NextResponse.json({
      status: 200,
      data: 'data'
    }) 

  } catch (error) {
    return NextResponse.json({
      status: 200,
      erro: error
    }) 
  }
}


export async function POST(request: Request){
  try {
    const req =  await request.json()
  
    await addDoc(collection(db, 'items'), {item:req})
    console.log('request :>> ',req);
  
    return NextResponse.json({
      status: 200,
      data: 'Inserted Successfully'
    }) 

  } catch (error) {
    return NextResponse.json({
      status: 504,
      error: error
    }) 
  }
}
"use client"

import { useState } from "react";
import { TbEyeOff, TbEye } from "react-icons/tb";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Loader from "react-loaders";

export default function Signup(){
    const BASE_URL=process.env.BASE_URL
    const [showPassword,setShowPassword]=useState(false)
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const {signup}=useAuth()
    const[image,setImage]=useState<null | File>(null)
    const[photo,setPhoto]=useState(null)


    const ImageResponse=async()=>{
        if(!image){
            return
        }
        const formData=new FormData()
        formData.append('image',image)
        const response= await (fetch('http://localhost:3000/api/images',{
            method:'POST',
            body:formData,
            headers:{
                Authorization:`Bearer ${JSON.parse((localStorage.getItem('noteUser') as unknown as any))?.token}`,
            }
        }))
        console.log(response)
    }
   
    
    return(
        <>
        <div className="animate">
        <div className="mt-10 flex justify-center">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col justify-center">
                    <label htmlFor="nama">Name</label>
                    <input onChange={(e)=>setName(e.target.value)} required type="email" className="text-gray-500 p-2 px-3 border border-gray-400 shadow-sm rounded" placeholder="Name"/>
                </div>
                <div className="flex flex-col justify-center">
                    <label htmlFor="nama">Username</label>
                    <input onChange={(e)=>setUsername(e.target.value)} required type="email" className="text-gray-500 p-2 px-3 border border-gray-400 shadow-sm rounded" placeholder="Username"/>
                </div>
                <div className="relative flex flex-col justify-center">
                    <label htmlFor="nama">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} required type={showPassword?'text':'password'} className="text-gray-500 p-2 px-3 border border-gray-400 shadow-sm rounded" placeholder="Password"/>
                    {showPassword?<TbEye className=" absolute right-4 top-9" onClick={()=>setShowPassword(false)}/>:<TbEyeOff className=" absolute right-4 top-9" onClick={()=>setShowPassword(true)}/>}
                </div>
                {/* This is the approach where we can select the image and display on the screen */}
                {/* {photo && 
                <Image src={`${photo}`} alt="Chose the correct image" width={200} height={200} className=" mx-2 my-2" />}
                <div>
                    <label className=" border border-gray-400 inline-block py-2 px-10 cursor-pointer rounded shadow-sm bg-gray-300 hover:bg-gray-500">
                    <input onChange={(e)=>{
                        setImage(e.target.files?.[0]??null)
                        if (e.target.files && e.target.files[0]){
                            setPhoto(URL.createObjectURL(e.target.files[0]))
                        }
                    }} type="file" className=" hidden"/>
                    Choose your photo
                    </label>
                </div> */}
                <div className="flex flex-col justify-center">
                    <button onClick={async()=>{
                        if(image){
                           await ImageResponse()
                        }
                        await signup(name,username,password)
                    }} className="p-2 px-3 border shadow-sm rounded bg-blue-400">Signup</button>
                    <button className=" text-blue-600 underline"><Link href="/signin">already have an account?</Link></button>
                </div>
            </div>
        </div>
        </div>
        <Loader active={true} type='ball-spin-fade-loader'/>
        </>
    )

}
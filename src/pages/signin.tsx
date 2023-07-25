"use client"

import { useState } from "react";
import { TbEyeOff, TbEye } from "react-icons/tb";
import { Navigate } from "react-router-dom";
import { useRouter } from 'next/navigation';
import Link from "next/link";
// import {useNavigate} from 'react-router-dom'
import { useAuth } from "@/context/authContext";
import Loader from "react-loaders";

export default function Signin(){
    const BASE_URL=process.env.BASE_URL
    const [showPassword,setShowPassword]=useState(false)
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const {signin}=useAuth()
   
    
    return(
        <>
        <div className="animate">
        <div className="mt-10 flex justify-center">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col justify-center">
                    <label htmlFor="nama">Username</label>
                    <input onChange={(e)=>setUsername(e.target.value)} required type="email" className="text-gray-500 p-2 px-3 border border-gray-400 shadow-sm rounded" placeholder="Username"/>
                </div>
                <div className="relative flex flex-col justify-center">
                    <label htmlFor="nama">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} required type={showPassword?'text':'password'} className="text-gray-500 p-2 px-3 border border-gray-400 shadow-sm rounded" placeholder="Password"/>
                    {showPassword?<TbEye className=" absolute right-4 top-9" onClick={()=>setShowPassword(false)}/>:<TbEyeOff className=" absolute right-4 top-9" onClick={()=>setShowPassword(true)}/>}
                </div>
                <div className="flex flex-col justify-center">
                    <button onClick={async()=>{
                        await signin(username,password)
                    }} className="p-2 px-3 border shadow-sm rounded bg-blue-400">Signin</button>
                    <button className=" text-blue-600 underline"><Link href="/signup">New User?</Link></button>
                </div>
            </div>
        </div>
        </div>
        <Loader active={true} type='ball-spin-fade-loader'/>
        </>
    )

}
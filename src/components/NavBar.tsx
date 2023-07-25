"use client"
import { useState,useEffect } from "react";
import {FcAlphabeticalSortingAz} from 'react-icons/fc'
import {BsFillCalendarDateFill} from 'react-icons/bs'
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import Image from "next/image";




export default function NavBar({notes,setNotes,order,setOrder}:any){
    const {currentUser}=useAuth()
    const [showDropdown,setShowDropdown]=useState(false)
    const {signout}=useAuth()

    
    return(
            <nav className=" sticky top-0 left-0 px-16 py-2 bg-gray-400 h-20 flex items-center justify-between">
                
                    <div className=" relative " >
                            {currentUser?.user?._id && 
                            <div onClick={()=>setShowDropdown(!showDropdown)} role="button" className=" rounded-full shadow-sm hover:opacity-25" >
                                
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${currentUser?.user?._id}`}
                                    alt=""
                                    className=" object-fill rounded-full border border-gray-800"
                                    style={{maxWidth:'40px',maxHeight:'40px',minWidth:'40px',minHeight:'40px'}}
                                    width={40}
                                    height={40}
                                />
                            </div>}
                        
                        {showDropdown && 
                        <div 
                            className=" flex flex-col  text-gray-800 rounded shadow-sm w-24 bg-blue-300 z-10 absolute">
                            <Link href="/home" className="p-2 rounded hover:bg-blue-200">Home</Link>
                            <Link href="/profile" className="p-2 rounded hover:bg-blue-200">Profile</Link>
                            <a onClick={()=>{
                                signout()
                                }} className="p-2 rounded hover:bg-blue-200 cursor-pointer">Signout</a>
                        </div>
                    }
                    </div>
                    <div>
                       {order? <BsFillCalendarDateFill size={30} onClick={()=>{
                        setOrder(!order)
                        location.reload()
                    }
                    }
                    className=" cursor-pointer"/>:
                        <FcAlphabeticalSortingAz color="black" size={30} onClick={()=>{
                           notes && setNotes(notes?.sort(
                                (p1:any, p2:any) => 
                                (p1.title < p2.title) ? -1 : (p1.title > p2.title) ? 1 : 0))
                          notes &&  setOrder(!order)
                        }
                    }
                        className=" cursor-pointer hover:opacity-[0.5"/>
                        }
                    </div>
                
             </nav>
    )
}
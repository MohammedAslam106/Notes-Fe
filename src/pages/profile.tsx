"use client"

import Image from "next/image";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState} from 'react'
import Modal from "../components/Modal";
import { useAuth } from "@/context/authContext";
import MyPicture from '../../public/assets/bg-profile.png'
import Loader from "react-loaders";

export default function EditProfilePicture(){
    const [isOpen,setIsOpen]=useState(false)
    const {currentUser}=useAuth()
    const[image,setImage]=useState<File|null>(null)
    const ImageRsponse=async()=>{
        if(!image){
            return
        }
        const formData=new FormData()
        formData.append('image',image)
        const response=await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/images`,{
        method:'POST',
        body:formData,
        headers:{
            Authorization:`Bearer ${JSON.parse((localStorage.getItem('noteUser') as unknown as any))?.token}`,
        }
    }
    )).json()
    if(response){
        console.log(response)
        // location.reload()
    }
    }

    
    return(
        <>
        <div className="animate">
            <NavBar/>
            <div className=" mx-20 mt-5 min-h-screen flex flex-col justify-center items-center">
                {/* to add the bg-image use the following code
                style={{backgroundImage:`url('${MyPicture.src}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',}} */}
                <div className="flex justify-center w-60 h-60" >
                    {currentUser?.user?._id &&
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${currentUser?.user?._id}`}
                        alt=""
                        width={500}
                        height={500}
                        className=" object-fill rounded-full "
                        onClick={()=>{
                            setIsOpen(true)
                        }}
                    />}
                </div>
                <div className="flex justify-center mt-5 gap-3">
                        <label className=" border border-gray-400 inline-block py-2 px-10 cursor-pointer rounded shadow-sm bg-gray-300 hover:bg-gray-500">
                            <input onChange={(e)=>setImage(e.target.files?.[0]??null)} accept=".png, .jpg, .jpeg" type="file" className=" hidden"/>
                            Edit Image
                        </label>
                        <button onClick={async()=>await ImageRsponse()} className=" p-2 px-3 rounded shadow-sm bg-blue-400">Save</button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
                <div className=" w-full flex flex-col items-center">
                {/* <button onClick={removeProfile} className=" btn bg-gray-500 mb-2">Remove Profile</button> */}
                    {/* <iframe src={MypPicture} frameborder="0"></iframe> */}
                     <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${currentUser?.user?._id}`}
                        alt=""
                        width={500}
                        height={500}
                     />
                     
                </div>
            </Modal>
            <Footer/>
        </div>
        <Loader active={true} type='ball-spin-fade-loader'/>
        </>
    )
}
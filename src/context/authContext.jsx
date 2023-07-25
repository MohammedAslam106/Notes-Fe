import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AuthContext=createContext()
const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL
export  function useAuth(){
    return useContext(AuthContext)
}


export const AuthProvider=({children})=>{

    useEffect(()=>{
        setCurrentUser(JSON.parse(localStorage.getItem('noteUser')))
        console.log(localStorage.getItem('noteUser'))
    },[])
    const [currentUser,setCurrentUser]=useState(null)
    const router=useRouter()
    const signup=async(name,username,password)=>{
        const response=await (fetch(`${BASE_URL}/auth/signup`,{
            method:"POST",
            body:JSON.stringify({
                name:name,
                username:username,
                password:password
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })).then(async(res)=>{
            const status= res.status
            if(status===200){
                const resp=await res.json() 
                console.log(resp)
                router.push('/signin')
            }
        }).catch((error)=>console.log(error))
    }
    const signin=async(username,password)=>{
        const response=await (fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,{
            method:"POST",
            body:JSON.stringify({
                username:username,
                password:password
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })).then(async(res)=>{
            const status=await res.status
            if(status===200){
                const data=await res.json()
                setCurrentUser(data)
                localStorage.setItem("noteUser",JSON.stringify(data))
                router.push('/home')
            }
            
        }).catch((error)=>console.log(error))

    }
    const signout=async()=>{
        localStorage.removeItem('noteUser')
        location.reload()
    }
    return(
        <AuthContext.Provider value={{currentUser,signin,signup,signout}}>
            {children}
        </AuthContext.Provider>
    )
}
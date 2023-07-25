"use client"

import { useRouter } from 'next/router'
import { useAuth } from '@/context/authContext'
import { useEffect } from 'react'

export default function ProtectRoutes({children}){
    const router=useRouter()
    const {currentUser}=useAuth()
    useEffect(()=>{
        if(!currentUser && !['/signin','/signup','/picture'].includes(router.pathname)){
          console.log(1,router.pathname)
          router.push('/signin') 
        }
        else if(currentUser && ['/signin','/signup'].includes(router.pathname)){
          console.log(2,router.pathname)
          router.back()
        }
        
    })
    return(
      <>
        {children}
      </>
    )
  }
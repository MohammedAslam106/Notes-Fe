"use client"
import Footer from "../components/Footer"
import Modal from "../components/Modal"
import NavBar from "../components/NavBar"
import { useState ,useEffect} from "react"
import request from '../utils/index'
import { TbHttpDelete, TbPlus, TbSearch, TbX, TbXd } from "react-icons/tb"
import {MdDelete} from 'react-icons/md'
import { Dialog, Transition } from "@headlessui/react"
import Loader from 'react-loaders'
export default function HomePage(){
    const [isOpen, setIsOpen] = useState(false)
    const [points,setPoints]=useState({x:0,y:0})
    const [deleting,setDeleting]=useState([])
    const createNote=async()=>{
        if(!editNotes.length){
            await request("notes",{method:'POST',body:{title:title,note:note}}).then((res)=>{
                // location.reload()
                console.log(res)}).catch((error)=>console.log(error))
        }
        else{
            await request(`notes/${editNotes[0]._id}`,{method:'PUT',body:{title:title,note:note}}).then((res)=>{
                // location.reload()
                console.log(res,'updated')}).catch((error)=>console.log(error))
        }
    }

    const deletTheseAll=()=>{
        deleting.map(async(not)=>{
            await request(`notes/${not}`,{method:'DELETE'}).then((res)=>{console.log('deleting')
            location.reload()
        }).catch(error=>console.log(error))
        })
    }

    const[title,setTitle]=useState('')
    const[note,setNote]=useState('')
    const[search,setSearch]=useState('')
    const [notes,setNotes]=useState([])
    const[editNotes,setEditNotes]=useState([])
    const[rightClick,setRightClick]=useState(false)
    const[order,setOrder]=useState(false)
    const[check,setCheck]=useState('unChecked')

    useEffect(()=>{
        const response=async()=>{
            await request('notes',{method:'GET'}).then((res)=>{
                console.log(res)
                setNotes(res.notes.filter((not: any)=>{
                    return not.title.toLowerCase().includes(search.toLowerCase())}))
            }
            ).catch((error)=>console.log(error))
        }
        response()
    },[search,isOpen])
    

    useEffect(()=>{
        setTitle(editNotes[0]?.title)
        setNote(editNotes[0]?.note)
    },[editNotes])
    return(
        <>
        <div className="animate">
            <NavBar notes={notes} setNotes={setNotes} order={order} setOrder={setOrder}/>
                <div className=" mx-10 mt-5 min-h-screen " >
                <div className="flex justify-center items-center -z-[1]">
                    <input onChange={(e)=>{
                        setOrder(false)
                        setSearch(e.target.value)}} type="text" placeholder="Search..."  className=" p-2 px-4 rounded-full shadow-sm border border-gray-500 text-gray-400 w-[75%]"/>
                </div>
                    {/* <TbSearch className="relative left-[65%] bottom-7]"/> */}
                <div className=" my-5 flex flex-col justify-center gap-2">
                    {notes.map((eachNote,ind)=>{
                        
                        return(
                            <div
                            onClick={()=>{
                                setEditNotes([eachNote])
                                console.log('left clicked')
                                if(rightClick){
                                    document.querySelectorAll('#check')[ind].checked=!document.querySelectorAll('#check')[ind].checked
                                }
                                else{
                                    setIsOpen(true)
                                }
                                
                            }} 
                            onContextMenu={(e)=>{
                                e.preventDefault()
                                console.log('right clicked')
                                setPoints({x:e.pageX,y:e.pageY})
                                setRightClick(true)
                            }}
                            role="button"
                             key={ind} className=" flex items-center justify-between w-full min-h-5 bg-gray-100 p-2 px-4 border rounded-lg shadow-sm font-sans hover:bg-blue-100">
                                <div 
                                 className=" ">
                                    <h1 className=" font-bold">{eachNote.title}</h1>
                                    <p className={`  h-6 overflow-hidden max-sm:overflow-hidden max-lg:overflow-hidden`}>{eachNote.note}</p> 
                                    <p>{new Date(eachNote?.createdAt).toUTCString().slice(0,16)}</p>
                                    
                                </div>
                                <div>
                                    {rightClick && <input id="check" className=" rounded-full w-5 h-5" 
                                        // onFocus={(e)=>{
                                        //     e.preventDefault()
                                        //     if(onFocus){
                                        //         e
                                        //     }
                                        // }}
                                      onClick={()=>{
                                        if (!deleting.includes(eachNote._id)){
                                            setDeleting((prev)=>[eachNote._id, ...prev])
                                        }else{
                                            setDeleting((prev)=>prev.filter(id=>eachNote._id!==id))
                                        }
                                        
                                    }} type="checkbox" />}
                                </div>
                            </div>
                        )
                    })}
                </div>
                </div>
                
            
            <TbPlus size={60} onClick={()=>{
                setEditNotes([])
                setRightClick(false)
                setIsOpen(true)}} className=" bg-yellow-400 border border-yellow-500 shadow-sm rounded-full fixed bottom-14 right-5 z-20 p-4 cursor-pointer"/>
                 {rightClick && <div className={" w-[30%]  fixed bottom-0 left-[35%] flex justify-center gap-2 z-40 mb-4 comeIn comeIn"}>
                    <TbX onClick={()=>setRightClick(false)} size={50} className=" text-white shadow-lg shadow-gray-800 bg-gray-600 border border-gray-500 rounded-full p-3 hover:opacity-50 "/>
                    <MdDelete onClick={()=>deletTheseAll()} size={50} className=" text-white shadow-lg shadow-gray-800 bg-gray-600 border border-gray-500 rounded-full p-3 hover:opacity-50 "/>
                </div>}
                <Footer/>
            <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} >
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col">
                            <label htmlFor="Title">Title of the note</label> 
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className=" rounded text-gray-500 border border-gray-400 shadow-sm p-2 px-3" type="text" />
                        </div>
                        <br />
                        <div className="flex flex-col">
                            <label htmlFor="Note">Write your Note</label> <br />
                            <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Note..." className="rounded text-gray-500 border border-gray-400 shadow-sm p-2 px-3 -mt-5" name="" id="" cols="10" rows="5"></textarea>
                        </div>
                        <div className=" flex items-end justify-end gap-3 mt-2">
                            <button 
                                onClick={()=>{
                                    setIsOpen(false)
                                }}
                                className=" p-2 px-3 border rounded shadow-sm bg-gray-400">Cancel</button>
                            <button
                                onClick={()=>{
                                    createNote()
                                    setIsOpen(false)
                                }}
                                className=" p-2 px-4 border rounded shadow-sm bg-blue-400">Save</button>
                        </div>
                    </div>
                </Modal>
        </div>
          <Loader active={true} type='ball-spin-fade-loader'/>
             
        </>
    )
}
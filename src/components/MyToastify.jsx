import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router-dom'
import { SignUp } from './SignUp'


export const MyToastify = () => {
    const {setMsg,msg} = useContext(MyUserContext)
    const navigate = useNavigate()
    console.log(msg);
    
    useEffect(()=>{
        if(msg?.err){
            toast.error(msg.err,{position:"bottom-center"})
            setMsg(null)
        }
        else if(msg?.signUp){
            console.log("LEFUTOT!!!!!!");
            
            toast.success(msg.signUp,{position:"bottom-center"})
            setTimeout(()=>{
                navigate("/signin") 
                setMsg(null)
            },2000)
        }
        else if(msg?.resetPw){
            toast.success(msg.resetPw,{position:"bottom-center"})
            setMsg(null)
            navigate("/signin")
        }
        else if(msg?.serverMsg){
            toast.success(msg.serverMsg, {position:"bottom-center"})
            setMsg(null)
                
        }
    },[msg])

  return null;
}
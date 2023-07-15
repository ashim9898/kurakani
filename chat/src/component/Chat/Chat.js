import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join"
import socketIO from "socket.io-client"
import "./Chat.css"
import sendLogo from "../../images/send.png"
import Message from "../Message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../../images/closeIcon.png"
const ENDPOINT = "http://localhost:4500/"


let socket;

const Chat = () => {

    const [message, setMessage] = useState('')
    const [messages,setMessages] = useState([])
    const[id, setId] = useState('')
const send=()=>{
   
    socket.emit('message',{message,id})
    setMessage('');
}

useEffect(()=>{
 socket = socketIO(ENDPOINT, {transports: ['websocket']})

socket.on('connect',()=>{
    alert("Your server is connected")
    setId(socket.id)
})
socket.emit('joined',{user})

socket.on('welcome',(data)=>{
   setMessages([...messages,data]);
    console.log(data.user,data.message)
})

socket.on('userJoined',(data)=>{
   setMessages([...messages,data]);
    console.log(data.user,data.message)
})

socket.on('leave',(data)=>{
    setMessages([...messages,data]);
    console.log(data.user,data.message)
})

return()=>{
   
    socket.disconnect();
}
},[])

useEffect(()=>{
    socket.on('sendMessage',(data)=>{
        setMessages([...messages,data]);
        console.log(data.user,data.message,data.id)
    })
    return()=>{
       socket.off()
    }
},[messages])

  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
                <h2>Kurakani</h2>
                <a href='/'><img src={closeIcon} alt="close"/></a>
            </div>
            <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
            <div className='inputBox'>
                <input onKeyDown={(event)=>event.key === 'Enter'?send(): null} onChange={(e)=>setMessage(e.target.value)} type='text' id="chatInput" value={message}/>
                <button onClick={send} className='sendBtn'><img src={sendLogo} alt="Send"/></button>
            </div>
        </div>
    </div>
  )
}

export default Chat

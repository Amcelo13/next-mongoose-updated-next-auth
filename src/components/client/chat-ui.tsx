"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:8000')

const ChatUI = () => {
    const session  =  useSession()
    const selectedUser = 'tchetan308@gmail.com';
    const userEmail =  session?.data?.user?.email
    const [message, setMessage] = React.useState('')    
    const roomId = selectedUser > (userEmail as string) ? userEmail + '-' + selectedUser : selectedUser + '-' + userEmail;
    useEffect(() => {
        socket.on('connection', () => {
            console.log('Connected')
            console.log('roomId: ', roomId);
        })
        socket.on('disconnect', () => {
            console.log('Disconnected')
        })
        socket.on(roomId, (data) => {
            console.log(data)
        })

        return () => {
            console.log('Disconnected')
        }
    }, [])

    const handleClick = () => {

        socket.emit('message', {
            message,
            sender:userEmail,
            receiver: selectedUser,
            roomId
        })
        setMessage('')
    }
    return (
        <div>

            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleClick} >Send</button>
        </div>
    )
}

export default ChatUI
import React, { useState } from 'react';
import styled from 'styled-components';
import { db, auth } from '../firebase';
import { Button } from '@material-ui/core';
import { doc, addDoc, collection, serverTimestamp} from '@firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({channelName,roomId,chatRef}) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState('')
    const sendMessage = (e)=> {
        e.preventDefault();

        if(!roomId && !user){
            return false;
        }
        addDoc(collection(doc(db,'rooms',roomId),"messages"), {
            message: input,
            timestamps: serverTimestamp(),
            userInfo:user.displayName,
            userImgUrl:user.photoURL
        })
        chatRef?.current.scrollIntoView({
            behavior:'smooth'
        })
        setInput('');
    }
    return (
        <ChatInputContainer>
            <form action=''>
                <input value={input} onChange = {(e)=> setInput(e.target.value)} placeholder={channelName ? `SEND MESSGAE TO ${channelName}` : 'Select a channel to message'} />
                <Button hidden type="submit" onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius:20px;
    > form  {
        position:relative;
        display:flex;
        justify-content: center
    }
    > form > input {
        position:fixed;
        bottom:30px;
        width:60%;
        border:1px solid gray;
        border-radius:3px;
        padding:20px;
        outline:none;
    }
    > form > button {
        display:none !important;
    }
    @media (max-width: 740px) {
        > form {
            justify-content : left;
            margin-left : 10px;
        }
        > form > input {
            padding : 15px;
            width : 60%;
        }
        > form > button {
            position : fixed;
            bottom : 35px;
            left : 85%;
        } > form > input::-webkit-input-placeholder{
            font-size : 10px;
        }
    }
    @media (min-width: 741px) {
        > form > button {
            bottom : 40px !important;
        }
    }
`

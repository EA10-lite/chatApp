import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { InputOutlined, StarBorderOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { doc, collection, orderBy, query } from '@firebase/firestore'
import Message from './Message';

const Chat = ()=> {
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && doc(db,'rooms',roomId)
    )
    const [roomMessages, loading ] = useCollection(
        roomId && query(collection(doc(db, "rooms", roomId), "messages"), orderBy("timestamps", "asc"))
    );

    useEffect(()=>{
        chatRef?.current.scrollIntoView({
            behavior : "smooth"
        })
    },[roomId, loading])
    return (
        <ChatContainer>
            <>
                <Header>
                    <HeaderLeft>
                        <h4><strong>#{roomDetails?.data().name} </strong></h4>
                        <StarBorderOutlined />
                    </HeaderLeft>
                    <HeaderRight>
                        <p>
                            <InputOutlined /> Details 
                        </p>
                    </HeaderRight>
                </Header>
                <ChatMessages>
                    {roomMessages?.docs.map(doc=>{
                        const { message, timestamps,userInfo, userImgUrl} = doc.data()
                        return (
                            <Message
                                message={message}
                                key={doc.id}
                                timestamps = {timestamps}
                                user={userInfo}
                                imageUrl = {userImgUrl}

                            />
                        )
                    })}
                    <ChatBottom ref={chatRef} />
                </ChatMessages>
                

                <ChatInput 
                    channelName = {roomDetails?.data().name}
                    roomId = {roomId}
                    chatRef={chatRef}
                />
            </>
        </ChatContainer>
    )
}

export default Chat;

const ChatBottom = styled.div`
    padding-bottom:300px;
`
const ChatMessages = styled.div`
`

const HeaderLeft = styled.div`
    display: flex;
    align-items:center
    >h4 {
        display:flex;
        text-trasnform:lowercase;
        margin-right:10px;
    }
    > h4 .MuiSvgIcon-root {
        font-size:10px;
        margin-left:10px;
    }

`
const HeaderRight = styled.div`
    >p {
        display:flex;
        align-items:center;
        font-size:14px;
    }
    >p > .MuiSvgIcon-root {
        margin-right:10px;
        font-size:16px;
    }

`
const Header = styled.div`
    display: flex;
    justify-content:space-between;
    padding:20px;
    border-bottom:1px solid lightgray;
`
const ChatContainer = styled.div`
    flex:0.7;
    flex-grow:1;
    overflow-y:scroll;
    margin-top:60px;

`
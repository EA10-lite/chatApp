import React from 'react';
import styled from 'styled-components';

const Message = ({message, timestamps, user, imageUrl}) => {
    const time = timestamps?.toDate();
    const timeValue = time?.toUTCString().toString();

    return (
        <MessageContainer>
            <img src={imageUrl} alt='' />
            <MessageInfo>

                <h4>
                    {user} <span> { timeValue } </span>
                </h4>
                <p> { message } </p>
            </MessageInfo>
        </MessageContainer>
    )
}
export default Message;

const MessageInfo = styled.div`
    padding-left:10px;

    > h4 > span {
        color:gray;
        font-weight:300;
        font-size:10px;
        margin-left:4px;
    }
`
const MessageContainer = styled.div`
    display:flex;
    align-items:center;
    padding:20px;

    >img {
        height:50px;
        border-radius:8px;
    }
`
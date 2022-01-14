import React from 'react'
import styled from 'styled-components'
import { db } from '../firebase';
import { collection, addDoc} from '@firebase/firestore'
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';

function SidebarOption({ Icon, title,addChannelOption, id }) {
    const dispatch = useDispatch();

    const addChannel = ()=> {
        const channelName = prompt('Please enter the channel name');
        if(channelName){
            addDoc(collection(db,'rooms'), {
                name: channelName,
            })
        }
    }
    const selectChannel = ()=> {
        if(id){
            dispatch(enterRoom({
                roomId: id,
            }))
        }
    }
    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon fontSize='small' style={{padding:10}} />}
            {Icon ? (
                <h3 className="icon-title">{title}</h3>
            ): (
                <SidebarOptionChannel>
                    <span>#</span> {title}
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption
const SidebarOptionChannel = styled.h3`
    padding:10px 0;
    font-weight:300;
    @media (max-width: 740px) {
        font-size : 10px;
        text-align: center;
        > .tag {
            display : block;
        }
    }

`
const SidebarOptionContainer = styled.div`
    display:flex;
    align-items:center;
    font-size:12px;
    padding-left:2px;
    cursor:pointer;
    
    :hover {
        opacity:0.9;
        background:;
    }
    >h3 {
        font-weight:500;
    }
    >h3 >span {
        padding:15px;
    }
    @media (max-width: 740px) {
        padding : 5px;
        
        > .icon-title {
            display : none;
        }
    }
`
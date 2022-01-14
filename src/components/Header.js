import React from 'react';
import styled from 'styled-components';
import { Search, AccessTime, HelpOutline} from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from '@firebase/auth';

const Header = ()=> {
    const [user] = useAuthState(auth);
    return (
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar onClick={()=> signOut(auth)} src={user?.photoURL} alt={user.displayName} />
                <AccessTime />
            </HeaderLeft>
            <HeaderCenter>
                <Search />
                <input placeholder="Search Channel"/>
            </HeaderCenter>
            <HeaderRight>
                <HelpOutline />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }

`
const HeaderCenter = styled.div `
    display: flex;
    flex:0.4;
    background-color: #421f44;
    text-align: center;
    border-radius: 6px;
    opacity: 1;
    padding:2px 50px;
    border:1px solid gray;

    > input {
        background: transparent;
        outline:none;
        border:0;
        min-width: 30vh;
        text-align: center;
    }
    > svg {
        width:20px;
        height:20px;
    }
    @media (max-width: 740px) {
        display : none;
    }
`
const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left:auto;
        margin-right:20px;
    }
    @media (max-width: 740px) {
        display : none;
        > .MuiSvgIcon-root {
            display : none;
        }
    }
`
const HeaderLeft = styled.div`
    flex:0.3;
    display: flex;
    align-items:center;
    margin-left:20px;
    
    > .MuiSvgIcon-root {
        margin-left: auto;
        color:white;
        margin-right: 20px;
    }
    @media (max-width: 740px) {
        > .MuiSvgIcon-root {
            display : none;
        } 
    }
`
const HeaderContainer = styled.div `
    background-color: var(--slack-color);
    display: flex;
    position: fixed;
    width:100%;
    align-items: center;
    padding:10px 0;
    justify-content: space-between;
    color:white;
    
`
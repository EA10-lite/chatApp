import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { signInWithPopup } from '@firebase/auth';
import { auth, provider } from '../firebase';

const Login = ()=> {
    const signIn = (e)=> {
        e.preventDefault();
        signInWithPopup(auth, provider).catch(err => alert(err.message));
    }
    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src='https://cdn.dribbble.com/users/121337/screenshots/5885287/slack.png?compress=1&resize=400x300' alt='' />
                <h1> Sign In to iChat</h1>
                <Button onClick={(e)=> signIn(e)}> Sgn in with Google </Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login;

const LoginContainer = styled.div`
    background:#f8f8f8;
    height:100vh;
    display:grid;
    place-items:center;
`
const LoginInnerContainer = styled.div`
    padding:100px;
    text-align:center;
    background-color:white;
    border-radius:10px;
    box-shadow:0 3px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    > img {
        object-fit:contain;
        height:100px;
        margin-bottom:20px;
    }
    >h1 {
        margin-bottom:20px;
    }
    > button {
        color:white;
        background:green;
    }
    > button:hover {
        backround:green;
        color:white;
    }
    
`
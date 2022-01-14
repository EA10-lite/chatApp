import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {
  const [ user, loading ] = useAuthState(auth);

  if (loading){
    return (
      <AppLoading>
        <AppLoadingContent>
          <img src='https://cdn.dribbble.com/users/121337/screenshots/5885287/slack.png?compress=1&resize=400x300' alt='' />

          <Spinner 
            name='ball-spin-fade-loader'
            color='purple'
            fadeIn="none"
          />
        </AppLoadingContent>
      </AppLoading>
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
        { !user ? (
          <Login />
        ): (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />}/>
              </Routes>
            </AppBody>
            </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
const AppLoadingContent = styled.div`
  text-align:center;
  padding-bottom:100px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  >img {
    padding:20px;
    margin-bottom:40px;
    height:150px;
  }

`
const AppLoading = styled.div`
  display:grid;
  place-items:center;
  height:100vh;
  width:100%
`

const AppBody = styled.div `
  display:flex;
  height:100vh;
  
`

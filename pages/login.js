import React,{useRef} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button } from '@mui/material';
import {auth , provider} from "../firebase";
import { signInWithPopup , signInWithPhoneNumber} from "firebase/auth";

function Login() {
    const phoneRef = useRef(null);
   
    const signIn = ()=>{
        signInWithPopup(auth,provider).catch(alert);
    };

    const signInMobile = ()=>{
        signInWithPhoneNumber(auth, phoneRef.current.value).catch(alert);
    };
  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>

        <LoginContainer>
            <Logo
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png'
            />
            <SignButton onClick={signIn} variant="outlined">Sign In with Google</SignButton>
            <MobileInput type="tel" ref={phoneRef} placeholder='Enter Mobile Number'/>
            <SignButton type = "submit" onClick={signInMobile} variant="outlined">Sign In with Mobile</SignButton>
        </LoginContainer>
    </Container>
  )
}


export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;
const LoginContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 100px;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Logo = styled.img`
    height: 150px;
    width: 150px;
    margin-bottom: 50px;
`;

const SignButton = styled(Button)`
    margin-top:5px;
    border-radius: 5px;
`;

const MobileInput = styled.input`
    outline-width: 0;
    flex: 1;
    border: none;
`;

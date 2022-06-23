import Head from 'next/dist/shared/lib/head';
import React from 'react'
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { collection,doc,docs, getDocs,getDoc ,serverTimestamp, setDoc, updateDoc, query, orderBy} from 'firebase/firestore';
import { db } from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import getRecipientEmail from '../../utils/getRecipientEmail';
import {auth} from '../../firebase';

function Chat({chat, messages}) {
    const [user]= useAuthState(auth);
    const usersDoc = doc(db, 'users', user.uid);
    const chatObj = JSON.parse(chat);

  return (
    <Container>
        <Head>
            <title>Chat with {getRecipientEmail(chatObj.users, user)}</title>
        </Head>
        <Sidebar/>
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages}/>
        </ChatContainer>
    </Container>
  )
}

export default Chat;

export async function getServerSideProps(context) {
    // const ref = collection(db,"chats").doc(context.query.id);
    const ref = doc(db,"chats",context.query.id);

    // // prep messages on the server
    // const messagesRes = await collection(ref,"messages").get();
      
    const messagesRes = await getDocs(query(collection(ref,"messages"),orderBy("timestamp","asc")));

    const messages = await messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...messages,
        timestamp: serverTimestamp(messages,"asc")
            
    }))
    ;
// Prep the chats
        const chatRes = await getDoc(ref);
        const chat = 
        {
            id: chatRes.id,
            ...chatRes.data(),
        };
 
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: JSON.stringify(chat),
        },
    };
}

const Container = styled.div`
    display: flex;

`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;
    ::-webkit-scrollbar{
        display: none;

    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
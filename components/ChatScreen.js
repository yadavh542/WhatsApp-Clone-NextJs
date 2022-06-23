import styled from 'styled-components';
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {useRouter } from "next/router";
import {auth,db} from "../firebase";
import {firebase, firestore} from "firebase/app";
import { Avatar, Button, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where, getDoc, getDocs,doc, setDoc,serverTimestamp, updateDoc, Timestamp, orderBy } from 'firebase/firestore';
import Message from './Message';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from "timeago-react";

function ChatScreen({chat, messages,users}) {
  const [user] = useAuthState(auth);
  const [input,setInput] = useState("");
  const endOfMessagesRef = useRef(null);
  const router = useRouter();
  const [msgSnap] = useCollection(query(collection(db,"chats",router.query.id,"messages"),orderBy("timestamp", "asc")));
  const chatObj = JSON.parse(chat);
  
  // const msgDoc = getDocs(collection(db,"chats",router.query.id,"messages")); 

  // const eachMsgTime = msgDoc.forEach((doc)=>{
  //   return serverTimestamp(doc);
  // })

  // const [recipientSnapshot] = useCollection(collection(db, "users")
  // );

  const [recipientSnapshot] = useCollection(
    query(collection(db, "users"), where("email", "==", getRecipientEmail(chatObj.users,user)))
  );

  const scrollToBottom= () =>{
      endOfMessagesRef.current.scrollIntoView({
        behavior: "smooth",
        block:"start",
      })
  };

  // const msgTime = msgSnap?.docs.forEach(doc => 
  //   updateDoc(doc,{ msgTimeNew: serverTimestamp()}));

  // const msgDocRef = doc(db,"chats",router.query.id,"messages", msgId);

  const showMessages  = () =>{

  //   const updateTimestamp = await updateDoc(msgDocRef, {
  //     timestamp: serverTimestamp()
  // });
      if (msgSnap) {
        return msgSnap.docs.map(message=>(
        
            <Message
              key = {message.id}
              user = {message.data().user}
              message = {{
                ...message.data(),
                timestamp: message.data().timestamp?.toDate().toString(),
                // timestamp: new Date(message.data().toDate())
              }}
             
            /> 
            
        ));
      } else{
        return JSON.parse(messages).map(message =>(
            <Message key={message.id} user={message.user} message={message}  />
        ));
      }
  }

  
  // const timestamp = JSON.parse(timestamp);
  const usersDoc = doc(db, 'users', user.uid);

  // const date = new Date();
  // const timeSeen = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

    // const myTime = JSON.parse(JSON.stringify(updatedTimestamp));
    

  const sendMessage = (e) =>{

    e.preventDefault();

    setDoc( usersDoc,
      { 
      lastSeen: serverTimestamp()
  
      }
    ,{merge:true});

    // setDoc(collection(db,"chats", router.query.id, "messages").docs.forEach(doc=> ( { 
    //   timestamp: serverTimestamp(),
    //   message: input,
    //   user: user.email,
    //   photoURL: user.photoURL,
    // } )));
    // const msgOrder = query(collection(db,"chats", router.query.id, "messages"),orderBy("timestamp", "asc"));

    setDoc(doc(collection(db,"chats", router.query.id, "messages")),{
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chatObj.users, user);

  return (
    <Container>
      <Header>
        { recipient?(
          <Avatar src={recipient?.photoURL}/>
        ) : ( 
          <Avatar>{recipientEmail[0]}</Avatar>
          )}
        <HeaderInfo>
          <h4>{recipientEmail}</h4>

          {recipientSnapshot? (
              <p>Last Active: {" "}
                 {recipient?.lastSeen? (
                    <TimeAgo datetime={recipient?.lastSeen}/>
                 ):("Unavailable")}
              </p>
          ):(<p>Loading Last Active...</p>)
          }
          
        </HeaderInfo>
          <HeaderIcons>
            <IconButton>
              <AttachFileIcon/>
              </IconButton>
            <IconButton>   
              <MoreVertIcon />

            </IconButton>
          </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessages ref={endOfMessagesRef}/>
      </MessageContainer>

      <InputContainer>
          <IconButton>
            <InsertEmoticonIcon/>
          </IconButton>
        
          <Input value={input} onChange={e=>setInput(e.target.value)}/>

          <IconButton>
          <SendIcon onClick={sendMessage}/>
          </IconButton>
         
          <IconButton>
            <MicIcon/>
          </IconButton>

          <Button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</Button>
          
          
      </InputContainer>
      </Container>
  )
}

export default ChatScreen;

const Container = styled.div`
 
`;

const Header = styled.div`
    display: flex;
    position:sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    padding:11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
    margin-left: 20px;
    flex: 1;

    >h4{
       margin-bottom: -6px;
  
    }
    >p{
      font-size: 14px;
      color:gray;
    }
`;

const HeaderIcons = styled.div`
    
`;

const MessageContainer = styled.div`
      min-height: 80vh;
      background-color: #e5ded8;
      padding: 40px;
     
`;
const EndOfMessages = styled.div``;

const InputContainer = styled.form`
      display: flex;
      align-items: center;
      padding: 10px;
      position: sticky;
      bottom: 0;
      background-color: white;
      z-index: 100;
`;

const Input = styled.input`
      flex: 1;
      outline: 0;
      border: none;
      border-radius: 10px;
      background-color: whitesmoke;
      padding: 20px;
      margin: 0 15px;
`;


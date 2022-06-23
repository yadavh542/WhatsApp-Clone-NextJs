import React from 'react'
import styled from "styled-components"
import { Avatar,IconButton, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from "email-validator";
import {auth, db} from "../firebase";
import {  signOut } from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import { collection, doc, setDoc, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore"; 
import { contains } from '@firebase/util';
import Chat from "./Chat";

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = query(collection(db,"chats"), where("users",'array-contains',user.email));
    const [userChatSnap] = useCollection(userChatRef);
    // const userChatRef = doc(db,"chats",user.uid);
    // const userChatSnap = getDoc(userChatRef);

    const createChat = ()=> {
        const input = prompt('Please enter email address to create a chat.');
        if (!input) return null;
        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){
            //Add chat into DB chats collection
            setDoc(doc(collection(db,"chats")),{
                users: [user.email, input],
    
              },{merge:true});
        }
    };

    const chatAlreadyExists = (recipientEmail) => {
        return !!userChatSnap?.docs.find(
            (chat)=>chat.data().users.find((user)=>user === recipientEmail)?.length>0
        );
    }

   

  return (
    <Container>
        <Header>
            <UserAvatar src={user.photoURL || email.charAt(0)} onClick={()=>signOut(auth)}/>
            <p>{user.email}</p>
            <IconsContainer>
                <IconButton>
                <ChatIcon onClick={createChat}/>
                </IconButton>
                <IconButton>
                <MoreVertIcon/>
                </IconButton>
               
            </IconsContainer>
        </Header>

        <Search>
            <SearchIcon/>
            <SearchInput placeholder='Search in Chats'/>
        </Search>

        <SidebarButton onClick={createChat}>START A NEW CHAT</SidebarButton>

        {/* List of Chats */}
        {userChatSnap?.docs.map((chat) =>
          <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
        )}

    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 350px;
    max-width: 450px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width:none;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;

    >p {
        margin-left:-80px;
        color: gray;
        font-size: 16px;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`
    
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline-width: 0;
    flex: 1;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    height: 40px;
    padding: 15px;
    margin-left: 7px;
`;

const SidebarButton = styled(Button)`
    width: 100%;
    color: gray;
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
   
`;

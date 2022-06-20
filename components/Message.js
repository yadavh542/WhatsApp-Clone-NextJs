import moment from 'moment';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';


function Message({user, message}) {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  return (
    <Container>
        <TypeOfMessage>{message.message}
          <Timestamp>
          {message.timestamp? moment(message.timestamp).format("LT"):"..."}
          </Timestamp>
          
        </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div`
     
`;

const MessageElement = styled.p`
      width: fit-content;
      padding: 20px;
      border-radius: 10px;
      margin-bottom:15px;
      min-width: 60px;
      padding-bottom: 30px;
      position: relative;
      text-align: right;
      font-size: 20px;
      font-weight: bold;
      
`;

const Sender = styled(MessageElement)`
      margin-left: auto;
      background-color: #dcf8c6;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const Reciever = styled(MessageElement)`
      background-color:whitesmoke;
      text-align: left;
      margin-right: auto;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

const Timestamp = styled.span`
      color: gray;
      padding: 10px;
      font-size: 9px;
      position: absolute;
      bottom: 0;
      text-align: right;
      right: 0;
`;
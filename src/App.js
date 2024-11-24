import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import socket from './socket';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
background-color: #f4f4f9;
`;

const MessagesList = styled.div`
width: 80%;
max-height: 300px;
overflow-y: scroll;
background: white;
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
width: 80%;
padding: 10px;
margin-top: 10px;
border-radius: 4px;
border: 1px solid #ccc;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', message);
      setMessage('');
    }
  };

  return (
    <Container>
      <h1>Real-Time Collaboration</h1>
      <MessagesList>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </MessagesList>
      <Input
      type='text'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      placeholder='Type a message...'
      />
    </Container>
  );
};

export default App;
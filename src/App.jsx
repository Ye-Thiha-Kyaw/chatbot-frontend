import React, { useState } from 'react';
import axios from 'axios';
import myPhoto from './images/myPhoto.jpg';


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async () => {
    if (!inputMessage.trim()) return; // Do not send empty messages

    const newMessage = { text: inputMessage, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    try {
      const response = await axios.post('http://localhost:5000/', {
        sender: 'user',
        message: inputMessage
      });

      // Assuming response.data is an array of bot responses
      response.data.forEach((message) => {
        const botResponse = { text: message.text, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      });
    } catch (error) {
      console.error('Error sending message to backend:', error);
      // Optionally handle error feedback to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className='flex  items-center m-3 border-solid border-2 border-sky-500 rounded-md border-transparent p-3'>
        <img src={myPhoto} alt="" className="w-20 h-20 rounded-lg mr-2" />
      <h2>Ye Thiha Kyaw's Personal chatbot. <br></br>You can curious about me. :-) </h2>
        </div>
      <div className="border border-gray-300 rounded-lg p-4 max-w-lg w-full">
        <div className="h-80 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-flex items-center rounded-lg p-2 ${msg.sender === 'user' ? 'bg-blue-200 text-white bg-blue-500' : 'bg-gray-200 text-black'}`}>
                <img 
                  src={msg.sender === 'user' ? 'https://i.pinimg.com/736x/b9/c4/7e/b9c47ef70bff06613d397abfce02c6e7.jpg' : myPhoto} 
                  className="w-8 h-8 rounded-full mr-2" 
                  alt="User Avatar" 
                />
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>

      
      <div className='mt-5'>
      <span>Attention! This chatbot has been trained, so not all conversations can be predicted. 
      You can ask for the following information. Sorry for any inconvenience.</span>
      <div>
      <ul>
        <li> - (hi,hello,...)</li>
        <li> - (bye,good night,...)</li>
        <li> - (thank you,...)</li>
        <li> - (what is your name,...)</li>
        <li> - (an you give me information about Ye Thiha Kyaw,I want to know about Ye Thiha Kyaw...)</li>
        <li> -  (How old is he?,his age?,...)</li>
        <li> - (tell me his expertise?,can you list his technical skills?,...)</li>
      </ul> 
      </div>
      
      </div>
    </div>

  );
};

export default Chatbot;

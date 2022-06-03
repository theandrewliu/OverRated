// import React, { useState, useEffect } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";


// //Chat component
// function Chat({ socket, username, room }) {
//     const [currentMessage, setCurrentMessage] = useState("");
//     const [messageList, setMessageList] = useState([]);

//     // function that is called when click button
//     const sendMessage = async () => {
//         if (currentMessage !== "") {
//         // will contain all the message and send this object to the socket server
//         const messageData = {
//             room: room,
//             author: username,
//             message: currentMessage,
//             time:
//                 // Current date to get hours and minutes
//                 new Date(Date.now()).getHours() +
//                 ":" +
//                 new Date(Date.now()).getMinutes(),
//             };
//             // first parameter is passed, second is passed to the socket server
//             await socket.emit("send_message", messageData);
//             setMessageList((list) => [...list, messageData]);
//             setCurrentMessage("");
//           }
//         };

//     // going to listen whenever any changes 
//     useEffect(() => {
//         socket.on("receive_message", (data) => {
//             // grab the current message list 
//             setMessageList((list) => [...list, data]);
//             console.log(data);
//         });
//       }, [socket]);

//       return (
//         <div className="chat-window">
//           <div className="chat-header">
//             <p>Live Chat</p>
//           </div>
//           <div className="chat-body">
//             <ScrollToBottom className="message-container">
//               {messageList.map((messageContent) => {
//                 return (
//                   <div
//                     className="message"
//                     id={username === messageContent.author ? "you" : "other"}
//                   >
//                     <div>
//                       <div className="message-content">
//                         <p>{messageContent.message}</p>
//                       </div>
//                       <div className="message-meta">
//                         <p id="time">{messageContent.time}</p>
//                         <p id="author">{messageContent.author}</p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </ScrollToBottom>
//           </div>
//           <div className="chat-footer">
//             <input
//               type="text"
//               value={currentMessage}
//               placeholder="Hey..."
//               onChange={(event) => {
//                 setCurrentMessage(event.target.value);
//               }}
//               onKeyPress={(event) => {
//                 event.key === "Enter" && sendMessage();
//               }}
//             />
//             <button onClick={sendMessage}>&#9658;</button>
//           </div>
//         </div>
//       );
//     }
    
//     export default Chat;
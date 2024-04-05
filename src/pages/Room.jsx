import React, { useEffect, useState } from "react";
import client, { databases } from "../appwriteConfig";
import { envVariables as env } from "../env";
import { ID, Permission, Query, Role } from "appwrite";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";
import { VscSend } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";


const Room = () => {

  const{user}=useAuth()
  //usestate
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  //useEffect when page renders
  useEffect(() => {
    getMessages();
     
    ///this is where realtime starts we have to unsubscribe bcz it runs twice
    const unsubscribe = client.subscribe(
      `databases.${env.appwriteDatabaseId}.collections.${env.collectionIdMessages}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A MESSAGE WAS CREATED ");
          setMessages(prevState => [response.payload, ...prevState]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A MESSAGE WAS DELETED ");
          setMessages(prevState =>
            prevState.filter(message => message.$id !== response.payload.$id)
          );
        }
      });
      return () =>{
        unsubscribe()
      }
  }, []);

  //when submit create a document and sent the data in the Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id:user.$id,
      username:user.name,
      body: messageBody,
    };
    let permissions=[
      Permission.write(Role.user(user.$id))
    ]

    let responce = await databases.createDocument(
      env.appwriteDatabaseId,
      env.collectionIdMessages,
      ID.unique(),
      payload,
      permissions
    );
    console.log("CREATED!", responce);
    // setMessages(prevState => [responce, ...prevState]);
    setMessageBody("");
  };

  //list all the chats  and then use map to loop on array and print chats in the ...
  const getMessages = async () => {
    try {
      let response = await databases.listDocuments(
        env.appwriteDatabaseId,
        env.collectionIdMessages
      );
      console.log("RESPONSE", response);
      setMessages(response.documents);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  //date message
  const deleteMessage = async (message_id) => {
    await databases.deleteDocument(
      env.appwriteDatabaseId,
      env.collectionIdMessages,
      message_id
    );
    //setMessages(prevState=>messages.filter(message=>message.$id !== message_id))
  };

  return (
    <main className="mx-auto p-2 md:p-4 bg-gray-100 rounded-lg shadow-lg">
    <Header />
    <div className="mt-2 md:mt-4">
      <div className="bg-white rounded-lg overflow-hidden">
        {messages.map((message) => {
          const messageTime = new Date(message.$createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          return (
            <div key={message.$id} className="flex justify-between items-center p-3 border-b">
              <div>
                {message?.username ? (
                  <span className="font-semibold">{message.username}</span>
                ) : (
                  <span className="text-gray-500">Anonymous User</span>
                )}
                <p className="text-gray-600">{messageTime}</p>
                <p className="text-gray-800">{message.body}</p>
              </div>
              {message.$permissions.includes(`delete("user:${user.$id}")`) && (
                <button
                  onClick={() => {
                    deleteMessage(message.$id);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <AiOutlineDelete/>
                </button>
              )}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <textarea
            required
            maxLength={1000}
            placeholder="Say something..."
            onChange={(e) => {
              setMessageBody(e.target.value);
            }}
            value={messageBody}
            className="w-full border rounded-md p-2 bg-white text-sm md:text-base focus:outline-none focus:border-blue-500"
            rows="3"
          ></textarea>

          
          
          
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white 
          font-bold py-2 px-4 rounded absolute right-0 bottom-0 mb-8 mr-2 "><VscSend /></button>
        </div>
      </form>
    </div>
  </main>
  




  );
};

export default Room;

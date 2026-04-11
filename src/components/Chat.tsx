import { useEffect, useState } from "react";
import { realDB } from "../firebase/firebase";
import { onValue, push, ref, set, update } from "firebase/database";
import { useAuthContext } from "../providers/provider";
import type { Message } from "../types";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);

  const clearForm = () => {
    setNewMessage("");
  };

  // user yo‘q bo‘lsa login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const updateMessage = (msg: Message) => {
    if (msg.userId === user?.uid) {
      setEditingId(msg.id);
      setNewMessage(msg.message);
    }
  };

  // realtime messages
  useEffect(() => {
    const messagesRef = ref(realDB, "messages/");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messagesArray as Message[]);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      if (editingId) {
        const messageRef = ref(realDB, `messages/${editingId}`);
        await update(messageRef, {
          message: newMessage,
        });
        setEditingId(null);
      } else {
        const messagesRef = ref(realDB, "messages/");
        const newMessagesRef = push(messagesRef);

        await set(newMessagesRef, {
          message: newMessage,
          userId: user?.uid,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          userName: user?.displayName,
          photoURL: user?.photoURL,
        });
      }

      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container p-4">
      <div className="bg-white shadow-md rounded-lg max-w-3xl w-full mx-auto">
        {/* header */}
        <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
          <p className="text-xl font-semibold mb-0">Chat app</p>
          <button className="btn btn-close"></button>
        </div>

        {/* messages */}
        <div className="p-4 h-100 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 flex ${
                msg.userId === user?.uid
                  ? "justify-end"
                  : "justify-start"
              }`}
              onDoubleClick={() => updateMessage(msg)}
            >
              {/* boshqa user */}
              {msg.userId !== user?.uid && (
                <img
                  src={msg.photoURL }
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}

              <div>
                <p className="text-black text-sm mb-1">
                  {msg.userName}
                </p>

                <p
                  className={`${
                    msg.userId === user?.uid
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } text-white rounded-lg py-1 px-4 inline-block select-none`}
                >
                  {msg.message}
                </p>

                <p className="text-black text-xs mt-0">
                  {msg.time}
                </p>
              </div>

              {/* o‘zing */}
              {msg.userId === user?.uid && (
                <img
                  src={msg.photoURL}
                  alt="avatar"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          ))}
        </div>

        {/* input */}
        <div className="p-4 border-t flex">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
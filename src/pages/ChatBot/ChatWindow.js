import React, {useState,useEffect ,useRef} from 'react';
import axios from 'axios';
import './ChatWindow.css';

const ChatWindow = () => {
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);
    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setConversation((prevConversation) => [
            ...prevConversation,
            {text: 'You: ' + message, isUser: true},
        ]);
        setMessage("");
        setIsLoading(true);

        try {
            const response = await callChatGPT4API(message);
            setIsLoading(false);
            setConversation((prevConversation) => [
                ...prevConversation,
                {text: 'ChatGPT4: ' + response, isUser: false},
            ]);
        } catch (error) {
            console.error("Error calling ChatGPT-4 API:", error);
            setIsLoading(false);
            setConversation((prevConversation) => [
                ...prevConversation,
                {
                    text:
                        "Sorry, there was an error processing your message. " + error.message,
                    isUser: false,
                },
            ]);
        }
    };


    const callChatGPT4API = async (message) => {
        const apiKey = process.env.REACT_APP_CHATGPT_API_KEY;
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const messages = [
            {role: 'system', content: 'You are a helpful assistant.'},
            {role: 'user', content: message},
        ];

        const model = 'gpt-4';
        const maxTokens = 200;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };


        // Define the API request payload
        const data = {

            model: model,
            messages: messages,
            max_tokens: maxTokens
        };

        try {
            const response = await axios.post(apiUrl, data, {headers});
            console.log(response)
            console.log(response.choices[0].message)
            const generatedText = response.choices[0].message.content;

            return generatedText;
        } catch (error) {
            console.error('Error calling ChatGPT-4 API:', error);
            return 'Sorry, there was an error processing your message.' + error;
        }
    };

    return (
        <div className="page-content">
            <h2>Chat Window</h2>

            <div className="chat-container" ref={chatContainerRef}>
                {conversation.map((msg, index) => (
                    <div key={index} className={msg.isUser ? "user-message" : "bot-message"}>
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="loading-indicator">
                        <span>Waiting For Response...</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="user-input"
                />
                <button type="submit" disabled={isLoading}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;

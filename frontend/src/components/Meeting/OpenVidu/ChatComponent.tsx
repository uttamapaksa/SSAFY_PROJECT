import React, { ChangeEvent, KeyboardEvent, useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

// import './ChatComponent.css';

const Div = styled.div`
background-color: white;
min-width: 100px;
min-height: 100px;
`;

export interface ChatProps {
    connectionIdProps: string;
    nicknameProps: string;
    streamManagerProps: any;
    chatDisplayProps: string;
    close: (property: string | undefined) => void;
    messageReceived: () => void;
}

interface messageType {
    connectionId: string;
    nickname: string;
    message: string;
}

const ChatComponent = ({ chatProps }: { chatProps: ChatProps }) => {

    const [messageList, setMessageList] = useState<messageType[]>([]);
    const [message, setMessage] = useState('');
    const chatScroll = useRef<HTMLDivElement>(null);

    const [chatDisplay, setChatDisplay] = useState(chatProps.chatDisplayProps);
    const [connectionId, setConnectionId] = useState(chatProps.connectionIdProps);
    const [nickname, setNickname] = useState(chatProps.nicknameProps);
    const [streamManager, setStreamManager] = useState<any>(chatProps.streamManagerProps);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handlePressKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        console.log(message);
        if (message) {
            let newMessage = message.replace(/ +(?= )/g, '');
            if (newMessage !== '' && newMessage !== ' ') {
                const data = { message: newMessage, nickname: nickname, streamId: streamManager.stream.streamId };
                streamManager.stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        setMessage('');
    };

    const scrollToBottom = () => {
        chatScroll.current?.scrollIntoView({ behavior: "instant" });
    };

    const close = () => {
        chatProps.close(undefined);
    };

    useEffect(() => {
        streamManager.stream.session.on('signal:chat', (event: any) => {
            const data = JSON.parse(event.data);
            let updatedMessageList = [...messageList];
            updatedMessageList.push({ connectionId: connectionId, nickname: data.nickname, message: data.message });
            const document = window.document;
            setTimeout(() => {
                const userImg = document.getElementById('userImg-' + (updatedMessageList.length - 1));
                const video = document.getElementById('video-' + data.streamId);
                // const avatar = userImg.getContext('2d');
                // avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
                chatProps.messageReceived();
            }, 50);
            setMessageList(updatedMessageList);
            scrollToBottom();
            if(updatedMessageList[updatedMessageList.length - 1].message === "hello") alert("hello")
            // if (messageList[messageList.length-1].message !== undefined) alert(messageList[messageList.length-1].message)
        }); 
        // return () => {
        //     console.log("sss");
        // }
    }, [messageList, chatProps]);

    const styleChat = { display: chatDisplay };

    return (
        <Div id="chatContainer">
            <div id="chatComponent" style={styleChat}>
                <div id="chatToolbar">
                    <span>{streamManager.stream.session.sessionId} - CHAT</span>
                    <div id="closeButton" onClick={close}>
                        <div color="secondary" />
                    </div>
                </div>
                <div className="message-wrap">
                    {messageList.map((data, i) => (
                        <div
                            key={i}
                            id="remoteUsers"
                            className={
                                'message' + (data.connectionId !== connectionId ? ' left' : ' right')
                            }
                        >
                            <canvas id={'userImg-' + i} width="60" height="60" className="user-img" />
                            <div className="msg-detail">
                                <div className="msg-info">
                                    <p> {data.nickname}</p>
                                </div>
                                <div className="msg-content">
                                    <span className="triangle" />
                                    <p className="text">{data.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div ref={chatScroll}></div>
                <div id="messageInput">
                    <input
                        placeholder="Send a message"
                        id="chatInput"
                        value={message}
                        onChange={handleChange}
                        onKeyPress={handlePressKey}
                    />
                    <div title="Send message">
                        <div id="sendButton" onClick={sendMessage}>
                            <div />
                        </div>
                    </div>
                </div>
            </div>
        </Div>
    );
};

export default ChatComponent;

import "../styles/chat1.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Chat from "./Chat";
import Notice from "./Notice";
import io from "socket.io-client";
import ChatRoomSettings from './ChatRoomSettings';

const socket = io.connect("http://localhost:8000", { autoConnect: false });

export default function Chatting2() {
  const [msgInput, setMsgInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userList, setUserList] = useState({});
  const [dmTo, setDmTo] = useState("all");
  const [roomColor, setRoomColor] = useState('#5158C8'); 


  const handleRoomColorChange = (color) => {
    setRoomColor(color);
    socket.emit("changeColor", color); // 서버로 변경된 roomColor 전송
  };

  const initSocketConnect = () => {
    console.log("connected", socket.connected);
    if (!socket.connected) socket.connect();
  };

  useEffect(() => {
    socket.on("error", (res) => {
      alert(res.msg);
    });

    socket.on("entrySuccess", (res) => {
      setUserId(res.userId);
    });

    socket.on("userList", (res) => {
      setUserList(res);
    });
  }, []);

  const userListOptions = useMemo(() => {
    const options = [];
    for (const key in userList) {
      if (userList[key] === userId) continue;
      options.push(<option key={key} value={key}>{userList[key]}</option>);
    }
    return options;
  }, [userList]);

  const addChatList = useCallback(
    (res) => {
      const type = res.userId === userId ? "my" : "other";
      const content = `${res.dm ? '(속닥속닥) ' : ''}  ${res.msg}`;
      const content2 = res.userId;
      const newChatList = [...chatList, { type: type, content: content, content2: content2 }];
      setChatList(newChatList);
    },
    [userId, chatList]
  );
  useEffect(() => {
    socket.on("chat", addChatList);
    return () => socket.off("chat", addChatList);
  }, [addChatList]);

  useEffect(() => {
    const notice = (res) => {
      const newChatList = [...chatList, { type: "notice", content: res.msg }];
      setChatList(newChatList);
    };

    socket.on("notice", notice);
    return () => socket.off("notice", notice);
  }, [chatList]);

 

  const sendMsg = () => {
    if (msgInput !== "") {
      socket.emit("sendMsg", { userId: userId, msg: msgInput, dm: dmTo });
      setMsgInput("");
    }
  };

  const entryChat = () => {
    initSocketConnect();
    socket.emit("entry", { userId: userIdInput, color: roomColor });
  };

  return (
    <>
      <div className="section-header">
        <h3>🎅 크리스마스 오픈 채팅 🎄</h3>
      </div>
      {userId ? (
        <div className="whole-container" style={{ backgroundColor: roomColor }}>
          <div className="chat-container">
            {chatList.map((chat, i) => {
              if (chat.type === "notice") return <Notice key={i} chat={chat} />;
              else return <Chat key={i} chat={chat} />;
            })}
          </div>
          <div className="input-container">
            <select value={dmTo} onChange={(e) => setDmTo(e.target.value)}>
              <option value="all">전체</option>
              {userListOptions}
            </select>
            <input
              type="text"
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
            />
            <button onClick={sendMsg}>전송</button>
          </div>
          <br />
          <ChatRoomSettings color={roomColor} onColorChange={handleRoomColorChange} />
        </div>
      ) : (
        <>
          <div className="input-container">
          <input
            type="text"
            value={userIdInput}
            onChange={(e) => setUserIdInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                {entryChat}
              }
            }}
            placeholder="닉네임을 입력해주세요!"
          />
            <button onClick={entryChat}>입장</button>
          </div>
        </>
      )}
    </>
  );
}
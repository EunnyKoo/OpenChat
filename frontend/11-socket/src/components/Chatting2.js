import "../styles/chat1.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Chat from "./Chat";
import Notice from "./Notice";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000", { autoConnect: false });

export default function Chatting2() {
  const [msgInput, setMsgInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userList, setUserList] = useState({});
  const [dmTo, setDmTo] = useState("all");

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
      const content = `${res.dm ? '(속닥속닥) ' : ''} ${res.userId}: ${res.msg}`;
      const newChatList = [...chatList, { type: type, content: content }];
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
    socket.emit("entry", { userId: userIdInput });
  };

  return (
    <>
      <div className="section-header">
        <h3>크리스마스 오픈 채팅</h3>
        <h5>기본적인 행위 금지 사항을 확인해주세요!</h5>
        <ul>
          <li>🎅 반말 (상호 존댓말을 원칙으로 하여 서로를 존중해요)</li>
          <li>🎄 불필요한 개인정보 요구 (성별, 나이, 연락처 등의 개인정보를 보호하세요)</li>
          <li>🎁 음단패설, 비속어, 정치적 발언 및 토론, 종교 전도 활동, 모욕적인 발언은 절대 금지!</li>
        </ul>
      </div>

      {userId ? (
        <div className="whole-container">
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
        </div>
      ) : (
        <>
          <div className="input-container">
            <input
              type="text"
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
            />
            <button onClick={entryChat}>입장</button>
          </div>
        </>
      )}
    </>
  );
}

import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import "../styles/chat2.css";
import christmas from "../styles/christmas.png";

export default function Chatting2() {
  const [inputMessage, setInputMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendMsg = useCallback(() => {
    setIsModalOpen(true);
    setInputMessage("");
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className="christmas">
        <img
          src={christmas}
          alt="크리스마스"
          style={{ width: "30%", height: "30%" }}
        />
      </div>
      <div className="section-header2">
        <h3>새해 소망을 말해보세요!</h3>
      </div>
      <>
        <div className="input-container2">
          <input
            type="text"
            placeholder="2024년 이루고 싶은 소망 한 가지를 말하세요!"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={sendMsg}>전송</button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="react-modal-content"
          overlayClassName="react-modal-overlay" 
        >
          <h4>새해 소망이 산타에게 전송되었습니다!</h4>
          <h4>2024년 원하는 소망 다 이루시고 행복만 가득하세요🎇</h4>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      </>
    </>
  );
}

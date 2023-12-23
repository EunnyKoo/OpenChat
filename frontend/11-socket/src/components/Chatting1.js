import { Link } from "react-router-dom";
import logo from "../styles/logo.png";
import React from "react";

export default function Chatting1() {
  return (
    <>
      <header className="Header">
        <img
          src={logo}
          className="logo"
          alt="로고"
          style={{ width: "100px", height: "auto" }}
        />
        <nav>
          <div className="chatRoom">
            <Link to="/christmas">Christmas Chat🎁</Link>
          </div>
          <div className="wishRoom">
            <Link to="/wish">Wish to Santa🎇</Link>
          </div>
        </nav>
      </header>
      <div className="spacer"></div>
    </>
  );
}

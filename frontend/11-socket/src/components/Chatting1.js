import { Link } from "react-router-dom";
import logo from "../styles/logo.png";
import christmas from "../styles/christmas.png";
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
          <div>
            <Link to="/christmas">Christmas Chat🎁</Link>
          </div>
          <div>
            <Link to="/SummerVacay">Wish to Santa🎇</Link>
          </div>
        </nav>
      </header>
      <div className="spacer"></div>
      <div className="christmas">
        <img
          src={christmas}
          alt="크리스마스"
          style={{ width: "30%", height: "30%" }}
        />
      </div>
    </>
  );
}

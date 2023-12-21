import { Link } from "react-router-dom";
import logo from "../styles/logo.png";
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

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
            <Link to="/christmas">Christmas Room🎁</Link>
          </div>
          <div>
            <Link to="/SummerVacay">Summer Vacation Room🐳</Link>
          </div>
        </nav>
      </header>
    </>
  );
}

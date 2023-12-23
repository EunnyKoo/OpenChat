const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const PORT = 8000;
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const userIdArr = {};
const roomColors = {}; // 추가: 각 사용자의 채팅방 화면 색상 정보를 저장

const updateUserList = () => {
  io.emit("userList", userIdArr);
};

io.on("connection", (socket) => {
  console.log("socket id", socket.id);

  socket.on("entry", (res) => {
    if (Object.values(userIdArr).includes(res.userId)) {
      socket.emit("error", {
        msg: "중복된 아이디가 존재하여 입장이 불가합니다.",
      });
    } else if (!res.userId) {
      socket.emit("error", {
        msg: "아이디를 입력해야 입장이 가능합니다.",
      });
    } else {
      io.emit("notice", { msg: `${res.userId}님이 입장하셨습니다.` });
      socket.emit("entrySuccess", { userId: res.userId });
      userIdArr[socket.id] = res.userId;

      // 추가: 사용자의 화면 색상을 초기화 (흰색)
      roomColors[socket.id] = "#ffffff";

      updateUserList();
    }
  });

  socket.on("disconnect", () => {
    io.emit("notice", { msg: `${userIdArr[socket.id]}님이 퇴장하셨습니다.` });
    delete userIdArr[socket.id];
    delete roomColors[socket.id]; // 추가: 사용자 퇴장 시 채팅방 화면 색상 정보도 삭제
    updateUserList();
  });

  socket.on("sendMsg", (res) => {
    if (res.dm === "all") {
      io.emit("chat", { userId: res.userId, msg: res.msg });
    } else {
      io.to(res.dm).emit("chat", {
        userId: res.userId,
        msg: res.msg,
        dm: true,
        color: roomColors[socket.id], // 추가: 개인 채팅 시 채팅방 화면 색상 정보 전달
      });
      socket.emit("chat", {
        userId: res.userId,
        msg: res.msg,
        dm: true,
        color: roomColors[socket.id], // 추가: 개인 채팅 시 채팅방 화면 색상 정보 전달
      });
    }
  });

  // 추가: 화면 색상 변경 이벤트
  socket.on("changeColor", (color) => {
    roomColors[socket.id] = color;
    socket.emit("colorChanged", { color });
  });
});

server.listen(PORT, function () {
  console.log(`Server Open: ${PORT}`);
});

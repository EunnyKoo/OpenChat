import io from "socket.io-client"
import {useEffect, useRef} from "react"

const socket = io.connect("http://localhost:8000", {autoConnect: false});
export default function Practice1() {

    const initSocketConnect = () => {
        if(!socket.connected) {
            socket.connect();
        }
    };

    useEffect(()=>{
        initSocketConnect();

        socket.on("resHello", (res) => {
            console.log(res);
            resultMsg(res);
            setChatList(newChatList);
            
        })
    }, []);

    const resultMsg = (res) => {
        result.current.innerText = res.msg;
    }

    const hello = () => {
        socket.emit("hello", {msg:"hello"})
    }
    const study = () => {
        socket.emit("study", {msg:"study"})
    }
    const bye = () => {
        socket.emit("bye", {msg:"bye"})
    }

    const result = useRef(null);

    return (
        <>
            <h3>Socket Practice 1</h3>
            <button onClick={hello}>hello</button>
            <button onClick={study}>study</button>
            <button onClick={bye}>bye</button>
            <p ref={result}></p>
        </>
    )
}
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatting1 from './components/Chatting1';
import Chatting2 from './components/Chatting2';
import Chatting3 from './components/Chatting3';

function App() {
  return (
    <>
    <BrowserRouter>
      <Chatting1 />
      <main>
        <Routes>
          <Route path="/christmas" element={< Chatting2 />}/>
          <Route path="/SummerVacay" element={< Chatting3 />}/>
        </Routes>
      </main>
    </BrowserRouter>
    </>
  );
}

export default App;

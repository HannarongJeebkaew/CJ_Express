import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/users/loginpage/LoginPage";
import Register from "./components/pages/users/registerpage/Register"; // เปลี่ยนจาก "./components/Auth" เป็นที่ตั้งของไฟล์ Auth
import Homepage from "./components/pages/users/homepage/homepage";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Homepage/>} />
        {/* ... อื่น ๆ ... */}
      </Routes>
    </Router>
  );
};

export default App;
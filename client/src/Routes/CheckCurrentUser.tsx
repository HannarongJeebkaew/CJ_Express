import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface CheckCurrentUserProps {
  children: React.ReactNode;
}

const CheckCurrentUser: React.FC<CheckCurrentUserProps> = ({ children }) => {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user && user.user.token) {
      navigate("/home");
    } else {
      setIsLoading(false);
    }
  }, [user, navigate]);

  return isLoading ?  <div>Loading...</div>:<>{children}</>; // ใช้ fragment แทน div เพื่อไม่มี element ที่ต้องแสดงผลออกมา
};

export default CheckCurrentUser;
import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/users/loginpage/LoginPage";
import Register from "./components/pages/users/registerpage/Register"; // เปลี่ยนจาก "./components/Auth" เป็นที่ตั้งของไฟล์ Auth
import Homepage from "./components/pages/users/homepage/homepage";
import RouteCheck from "./Routes/RouteCheck";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "./store/userSlice";
import { logout } from "./store/userSlice";
import Dataproducttable from "./components/pages/users/Dataproducttable/Dataproducttable";
import Notfound404 from "./components/pages/Notfound404";
import CheckCurrentUser from "./Routes/CheckCurrentUser";
const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false); // สร้าง state สำหรับบ่งบอกว่าข้อมูลถูกโหลดเสร็จแล้วหรือไม่
  interface LoginData {
    name: string;
    token: string;
  }

  useEffect(() => {
    console.log("isLoaded APP",isDataLoaded);
    const currentUser = async (token: string) => {
      const res = await axios.post(
        import.meta.env.VITE_REACT_APP_API + "/current-user",
        {},
        {
          headers: {
            authtoken: token,
          },
        }
      );
      return res;
    };
    const idToken = localStorage.getItem("token");
    currentUser(idToken).then(async(res) => {
      console.log("isLoaded APP2",isDataLoaded);
      if (res.data === "Token Invalid!!!") {
        dispatch(logout());
      }
      dispatch(login({ name: res.data.username, token: idToken } as LoginData));
      setIsDataLoaded(true);
    }).catch((err)=>{
      console.log(err);
      setIsDataLoaded(true);
    });
    console.log("5555555");
  }, []);
  if (!isDataLoaded) {
    return <div>Loading...</div>; // หากข้อมูลยังไม่โหลดเสร็จให้แสดง "Loading..."
  }
  return (
    <Router>
      <Routes>
        \
        <Route
          path="*"
          element={
            <Notfound404 text="The page you’re looking for doesn’t exist." path="/login"></Notfound404>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <CheckCurrentUser>
              <Login />
            </CheckCurrentUser>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={

            <RouteCheck isDataLoaded={isDataLoaded}>
              <Dataproducttable />
            </RouteCheck>
          }
        />
        {/* ... อื่น ๆ ... */}
      </Routes>
    </Router>
  );
};

export default App;

import React,{useEffect} from "react";
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
const App: React.FC = () => {
  const dispatch = useDispatch();
  interface LoginData {
    name: string;
    token: string;
  }
  useEffect(() => {
    const currentUser = async (token:string) => {
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
    console.log(idToken);
    
    currentUser(idToken).then((res) => {
      console.log(res);
      if(res.data==="Token Invalid!!!"){
        dispatch(
          logout()
        );
      }
      dispatch(
        login({ name: res.data.username,token:idToken} as LoginData)
      );
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <RouteCheck>
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

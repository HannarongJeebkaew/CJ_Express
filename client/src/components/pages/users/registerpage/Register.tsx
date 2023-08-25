import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as LinkDom } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../../../../assets/logo.png";
import { registerUser } from "../../../../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate()
  const isEmailValid = (email: string): boolean => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  };
  const isValidPassword = (password: string): boolean => {
  
    // ตรวจสอบว่ารหัสผ่านประกอบด้วยตัวเลขและภาษาอังกฤษเท่านั้น
    if (!/^[0-9a-zA-Z]+$/.test(password)) {
      return false;
    }
  
    return true;
  };
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isEmailValid(data.get("email")?.toString())) {
        console.log("Email is valid");
      } else {
        alert("Email is not valid");
        return;
      }
    const datanew = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
      username: data.get("username")?.toString(),
    };
    if (isValidPassword(data.get("password")?.toString())) {
        console.log("Password is valid");
      } else {
        alert("Password is not valid");
        return;
      }
      if (isValidPassword(data.get("username")?.toString())) {
        console.log("username is valid");
      } else {
        alert("Username is not valid");
        return;
    }
    if (datanew.email && datanew.password && datanew.username) {
      await registerUser(datanew.username, datanew.email, datanew.password).then((res)=>{
        alert("สมัครสำเร็จแล้ว");
        navigate('/login');
      }).catch((err)=>{
        if(err.response.data.message==="มี username นี้อยู่ในระบบแล้ว"){
            alert("มี username นี้อยู่ในระบบแล้ว");
        }
        console.log(err);
      })
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <ThemeProvider theme={createTheme() } >
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Container style={{ height: "15vh", width: "15vh" }}>
            <img
              src={Logo}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            ></img>
          </Container>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputProps={{
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$", // ตรวจสอบรูปแบบ Email
                    title: "Please enter a valid email address", // ข้อความที่จะแสดงเมื่อรูปแบบไม่ถูกต้อง
                  }}
                  title="Please enter a valid email address" // ข้อความที่จะแสดงเมื่อรูปแบบไม่ถูกต้อง
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;

import * as React from "react";
import { CssVarsProvider, Theme, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import { Link as LinkDom, useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import Logo from "../../../../assets/logo.png";
import CJ_More from "../../../../assets/ร้าน-CJ-More.jpg";
import CJ_More1 from "../../../../assets/BB11194-C97E686-8E43638.jpg";
import { loginUser } from "../../../../api/auth";
import {login} from "../../../../store/userSlice"
import { useDispatch } from "react-redux";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
 
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="lg"
      variant="plain"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

/**
 * This template uses [`Inter`](https://fonts.google.com/specimen/Inter?query=inter) font.
 */
export default function LoginPage() {
  const [usernameError, setUsernameError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async(event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const usernameValue = formElements.username.value;
    const passwordValue = formElements.password.value;
    const handleLogin = async () => {
      await loginUser(usernameValue, passwordValue)
        .then((res) => {
          console.log(res);
          if (res.data.token) {
            dispatch(login({name:res.data.payload.user.name,token:res.data.token}))
            alert("login success")
            localStorage.setItem("token", res.data.token);
            navigate('/home')
          }

        })
        .catch((err) => {
          if(err.response.data.message==="Invalid username or password"){
            alert("Invalid username or password")
          }
          console.log(err);
          
        });
    };
    if (!usernameValue) {
      setUsernameError("กรุณากรอก Username ด้วยครับ");
    
    }else{
      setUsernameError(null);
    }

    if (!passwordValue) {
      setPasswordError("กรุณากรอก Password ด้วยครับ");
  
    }else{
      setPasswordError(null);
    }
    if(usernameValue&&passwordValue){
      await handleLogin()
    }
    
  };
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ maxHeight: "10vh", maxWidth: "10vw" }}>
              <img
                src={Logo}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <div>
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Sign in to your account
              </Typography>
            </div>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  aria-describedby={
                    usernameError ? "username-error-text" : undefined
                  }
                />
                {usernameError && (
                  <p style={{ color: "red" }}>{usernameError}</p>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  aria-describedby={
                    passwordError ? "password-error-text" : undefined
                  }
                />
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg" >
                  Forgot your password?
                </Link>
                <Link fontSize="sm" href="/register" fontWeight="lg"  sx={{
    color: "green", // เปลี่ยนสีเป็นสีที่คุณต้องการ
    textDecoration: "underline", // เพิ่มเส้นใต้
    // สามารถกำหนดสไตล์เพิ่มเติมตามที่คุณต้องการได้
  }}>
                  Create new account?
                </Link>
              </Box>
              <Button type="submit" fullWidth>
                Sign in
              </Button>
            </form>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
           `url(${CJ_More})`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
            `url(${CJ_More1})`,
          },
        })}
      />
    </CssVarsProvider>
  );
}

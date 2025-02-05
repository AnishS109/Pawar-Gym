import React, { useContext, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Close } from "@mui/icons-material";

import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataProvider";

const Login = () => {

  const {setAccount} = useContext(DataContext)

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false)

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({...data,[name]:value})
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if(data.username === "1" && data.password === "1"){
      setAccount({username:data.username, password:data.password})
      navigate("/Home")
    } else {
      setOpen(true)
    }
  }

  return (
    <Box className="flex justify-center px-2 items-center h-screen w-screen bg-gradient-to-r 
    from-gray-900 via-red-900 to-black">
      <Box className="bg-white bg-opacity-20 backdrop-blur-lg h-[500px] w-[400px] rounded-2xl shadow-2xl p-6 flex flex-col items-center">
        <img src={logo} alt="logo" className="z-10 mt-[-110px]" />

        <TextField
          label="Username"
          variant="outlined"
          value={data.username}
          onChange={handleChange}
          fullWidth
          name="username"
          className="mb-4"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle className="text-white" />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ className: "text-white" }}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
          }}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          variant="outlined"
          value={data.password}
          name="password"
          onChange={handleChange}
          fullWidth
          type={showPassword ? "text" : "password"}
          className="mb-4"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock className="text-white" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  color="inherit"
                >
                  {showPassword ? (
                    <VisibilityOff className="text-white" />
                  ) : (
                    <Visibility className="text-white" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ className: "text-white" }}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
          }}
        />

        {/* Login Button */}
        <Button
        onClick={handleSubmit}
          variant="contained"
          className="mt-4 bg-red-600 w-full py-2 text-lg font-semibold"
          sx={{ borderRadius: "8px" }}
        >
          Login
        </Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        className="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg relative"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          color: "white",
          width: "300px",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
        >
          <Close />
        </IconButton>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          ❌ Username or Password is Wrong!
        </Typography>
      </Box>
    </Modal>

    </Box>
  );
};

export default Login;

import { AppBar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import Logo from "../assets/logo.png"

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';

const NavBar = () => {

  const [drawerOpen, SetDrawerOpen] = useState(false)

  const location = useLocation()
  const activePage = location.pathname

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
  <>
  <AppBar className="sticky shadow-sm">
  <Toolbar className="bg-gradient-to-r 
    from-gray-900 via-red-900 to-black flex justify-between items-center shadow-sm">

{/* ------------------------------------------------------------------------------------ */}

  <Box
  className="flex items-center gap-1">

    <img 
    className="h-[70px]"
    src={Logo} alt="Mocn Ninja Logo" />

    <Typography 
    className="text-xl sm:text-2xl md:text-3xl sm:inline-block text-nowrap font-[roboto] font-bold tracking-tight">
      Pawar Gym
    </Typography>

  </Box>

{/* ------------------------------------------------------------------------------------ */}
  
  <Button 
  onClick={() => SetDrawerOpen(true)}
  className="text-white w-fit mr-[-15px]">
  <MenuIcon className="md:hidden text-[30px] sm:text-[33px] cursor-pointer"/> 
  </Button>

{/* ------------------------------------------------------------------------------------ */}

  <Box 
  className="hidden gap-12 md:flex mr-16">

  <Box className="flex justify-between items-center md:gap-16">
    
  <NavLink to={"/Home"}>
  <Box 
  variant="outlined"
  className={`text-white text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation `}>
  Home
  </Box>
  </NavLink>
    
  <NavLink to={"/Members"}>
  <Box 
  variant="outlined"
  className={`text-white text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation `}>
  Members
  </Box>
  </NavLink>
  
  <NavLink to={"/Offline"}>
  <Box 
  variant="outlined"
  className={`text-white text-nowrap text-[17px] font-bold border-none transition-all btn-line-animation `}>
  Offline
  </Box>
  </NavLink>

  </Box>
  </Box>
  </Toolbar>
  </AppBar>

{/* ------------------------------- MOBILE VIEW ---------------------------------- */}
{/* ------------------------------- MOBILE VIEW ---------------------------------- */}
{/* ------------------------------- MOBILE VIEW ---------------------------------- */}

<Drawer
  anchor="right"
  open={drawerOpen}
  onClose={() => SetDrawerOpen(false)}
  sx={{
    "& .MuiDrawer-paper": {
      width: { xs: "240px", sm: "300px" },
      background: "linear-gradient(to right, #1F2937, #7F1D1D, #000000)", 
      color: "white",
    },
  }}
>

{/* ---------------------------------------------------------------------------------------- */}

  <Box className="flex items-center justify-center mr-6">
  <img 
  className="h-[80px] w-[80px]"
  src={Logo} alt="Mock Ninja logo"/>

  <Typography className="text-xl sm:text-2xl md:text-3xl sm:inline-block text-nowrap font-[roboto] font-extrabold tracking-tight">
    Pawar Gym
  </Typography>
  </Box>
  
  <Box className="px-4 h-1 w-full">
  <Box className="border-b-2 border-gray-500 h-1 w-full"></Box>
  </Box>

{/* ---------------------------------------------------------------------------------------- */}

  <Box className="flex flex-col gap-4 mt-16 mx-10">
    
    <NavLink to={"/home"}>
    <Button
    startIcon={<HomeIcon />}
    variant="contained"
    className={` font-bold shadow-none w-full pr-[68px] text-[15px] hover:rounded-[20px] rounded-[20px] ${activePage === "/home" || activePage === "/Home" ? "bg-white text-black" : "bg-gray-900 text-white"}`}
    >
      Home
    </Button>
    </NavLink>
    
    <NavLink to={"/members"}>
    <Button
    startIcon={<BeenhereIcon/>}
    variant="contained"
    className={` font-bold shadow-none w-full pr-[34px] text-[15px] hover:rounded-[20px] rounded-[20px] ${activePage === "/members" || activePage === "/Members" ? "bg-white text-black" : "bg-gray-900 text-white"}`}
    >
      Members
    </Button>
    </NavLink>
    
    <NavLink to={"/offline"}>
    <Button
    startIcon={<PersonAddDisabledIcon/>}
    variant="contained"
    className={` font-bold shadow-none text-nowrap w-full pr-[46px] text-[15px] hover:rounded-[20px] rounded-[20px] ${activePage === "/offline" || activePage === "/Offline" ? "bg-white text-black" : "bg-gray-900 text-white"}`}
    >
      Offline
    </Button>
    </NavLink>

  </Box>

{/* ---------------------------------------------------------------------------------------- */}

<Box className="px-4 h-1 w-full mt-6 absolute bottom-0 mb-16">
    <Box className="border-b-2 border-gray-500 h-1 w-full"></Box>
  </Box>

  <Box className="absolute bottom-0 ml-8 sm:ml-16 mb-5">

    <Typography className="text-white font-bold text-[16px] sm:text-[18px]">
      {today}
    </Typography>

  </Box>

</Drawer>

  </>
  )
}

export default NavBar

import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import DataProvider, { DataContext } from "./Context/DataProvider";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Members = lazy(() => import("./pages/Members"));
const Offline = lazy(() => import("./pages/Offline"));

// ----------------------- PROTECTED ROUTES --------------------------

const Private = () => {
  const { account } = useContext(DataContext)
  return account.username !== "" ? <Outlet/> : <Navigate to = {"/"}/>
}

  const App = () => {

  return (
<>
<DataProvider>
  <BrowserRouter>
    <Suspense fallback={
    <Box className="h-[100vh] flex justify-center items-center text-purple-400">
    <CircularProgress />
    </Box>}>
      <Routes>
      
      <Route path="/" element={<Login />} />

      <Route element={<Private/>}>
      <Route path="/home" element={<Home />} />
      <Route path="/members" element={<Members />} />
      <Route path="/offline" element={<Offline />} />
      </Route>

      </Routes>
    </Suspense>
  </BrowserRouter>
</DataProvider> 
</>
  );
};

export default App;

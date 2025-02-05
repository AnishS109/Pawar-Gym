import axios from "axios"
import React, { useContext, useState } from 'react'
import Layout from "../Layout/Layout"
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, TextField, CircularProgress, Snackbar, Alert } from '@mui/material'
import {DataContext} from "../Context/DataProvider"


import homeBanner from "../assets/banner.png"

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {

  const {backendUrl} = useContext(DataContext)

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalMsg, setModalMsg] = useState({open:false, msg:"", severity:""})

  const [formData, setFormData] = useState({
    name:"",
    phoneNumber:"",
    adharNumber:"",
    joinDate:"",
    monthsPaid:"",
  })

// ----------------------------------------------------------------------------

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]:value})
  }

// ----------------------------------------------------------------------------

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    if(formData.phoneNumber.length !== 10){
      setModalMsg({open:true, msg:"Enter 10 digit Mobile Number", severity:"error"})
      setLoading(false)
      return
    }

    if(formData.adharNumber.length !== 12){
      setModalMsg({open:true, msg:"Enter 12 digit Adhar Number", severity:"error"})
      setLoading(false)
      return
    }

    if(formData.monthsPaid.length > 2){
      setModalMsg({open:true, msg:"Enter valid months", severity:"error"})
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(`${backendUrl}/Add-Member`, formData)
      if(response.status === 200){
        setModalMsg({open:true, msg:response.data.message, severity:"success"})
        setOpen(false)
      }
    } catch (error) {
      setModalMsg({
        open:true,
        msg:error.response?.data?.message || "Check your Network! Try again Later",
        severity:"error"})
    } finally {
      setLoading(false)
    }
    
  }

// ----------------------------------------------------------------------------

  return (
  <>
  <Layout>
  <Box 
    sx={{
      backgroundImage: `url(${homeBanner})`,
      backgroundPosition: { xs: '-270px center', md: 'center' },
      backgroundSize: 'cover',
    }}
    className="bg-no-repeat h-screen w-screen"
  >
  <Box className="h-screen w-screen flex justify-center items-center">
  
  <Box className="w-52 h-20 bg-white flex justify-center items-center bg-opacity-15 backdrop-blur-lg">

    <Button 
    onClick={() => setOpen(true)}
    variant='contained'
    className="shadow-none bg-black h-12 w-44">
     <span><PersonAddIcon className='mr-2'/></span> Add Members
    </Button>

  </Box>

  </Box>
  </Box>
  </Layout>

{/* --------------------------------- ADD MEMBER MODAL ---------------------------------------- */}
{/* --------------------------------- ADD MEMBER MODAL ---------------------------------------- */}
{/* --------------------------------- ADD MEMBER MODAL ---------------------------------------- */}

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  fullWidth
  maxWidth="xs"
  className="bg-opacity-15 backdrop-blur-[2.5px]"
  sx={{
    "& .MuiPaper-root": {
      backdropFilter: "blur(200px)",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      padding: "20px", 
      color: "black",
      paddingX:"0px",
      paddingBottom:"0px",
      maxWidth: { xs: "100vw", sm: "500px" }, 
    },
  }}
>
<IconButton
  onClick={() => setOpen(false)}
  className='bg-black text-white hover:bg-black'
  sx={{
    position: "absolute",
    top: 10,
    right: 10,
  }}
>
  <CloseIcon />
</IconButton>

<DialogTitle className="flex justify-center mr-6 font-bold">
  <PersonAddIcon className="mr-2 text-[28px] mb-[2px]" />
  Add Member
</DialogTitle>

<DialogContent>

        <TextField
          label="Name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder='Enter name'
          name="name"
          className="mt-4"
          InputLabelProps={{ className: "text-white" }}
          sx={{
            input: { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "black" },
            },
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiInputLabel-root.Mui-focused": { color: "black" },
          }}
        />

        <TextField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder='Enter phone number'
          variant="outlined"
          type="number"  
          inputMode="numeric"
          fullWidth
          name="phoneNumber"
          className="mt-4"
          InputLabelProps={{ className: "text-white" }}
          sx={{
            input: { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "black" },
            },
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiInputLabel-root.Mui-focused": { color: "black" },
          }}
        />

        <TextField
          label="Adhar Number"
          value={formData.adharNumber}
          onChange={handleChange}
          placeholder='Enter Adhar Card number'
          variant="outlined"
          type="number"  
          inputMode="numeric"
          fullWidth
          name="adharNumber"
          className="mt-4"
          InputLabelProps={{ className: "text-white" }}
          sx={{
            input: { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "black" },
            },
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiInputLabel-root.Mui-focused": { color: "black" },
          }}
        />

        <TextField
          label="Months"
          value={formData.monthsPaid}
          onChange={handleChange}
          placeholder="Enter months"
          variant="outlined"
          fullWidth
          name="monthsPaid"
          type="number"  
          inputMode="numeric" 
          pattern="[0-9]*" 
          className="mt-4"
          InputLabelProps={{ className: "text-white" }}
          sx={{
            input: { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "black" },
            },
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiInputLabel-root.Mui-focused": { color: "black" },
          }}
        />


        <Typography className='mt-2 font-semibold'>
          Joining Date
        </Typography>

        <TextField
        type='date'
          variant="outlined"
          fullWidth
          value={formData.joinDate}
          onChange={handleChange}
          name="joinDate"
          className=""
          InputLabelProps={{ className: "text-white" }}
          sx={{
            input: { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "black" },
            },
            "& .MuiInputLabel-root": { color: "black" },
            "& .MuiInputLabel-root.Mui-focused": { color: "black" },
          }}
        />

        {loading ? (
          <Box className="flex justify-center mt-4">
            <CircularProgress className='text-black'/>
          </Box>
        ): (
          <Button 
          disabled={!formData.name || !formData.phoneNumber || !formData.monthsPaid || !formData.joinDate}
          onClick={handleSubmit}
          variant='contained'
          className='w-full bg-black text-white mt-4 rounded-md'>
            Submit
          </Button>
        )}

  </DialogContent>
</Dialog>

{/* -------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------------------------------------- */}
{/* -------------------------------------------------------------------------------------- */}

<Snackbar
    open={modalMsg.open}
    className='mt-4'
    autoHideDuration={3000}
    onClose={() => setModalMsg({...modalMsg, open:false})}
    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
  >
    <Alert onClose={() => setModalMsg({...modalMsg, open:false})} severity={modalMsg.severity} sx={{ width: '100%' }}>
      <b className='text-[17px]'>{modalMsg.msg}</b>
    </Alert>
  </Snackbar>
  </>
  )
}

export default Home
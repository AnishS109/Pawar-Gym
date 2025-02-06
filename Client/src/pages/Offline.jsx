import axios from "axios"
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, IconButton, Snackbar, Alert } from '@mui/material'
import { DataContext } from "../Context/DataProvider";

import { GiConfirmed } from "react-icons/gi";
import { Add, Remove, CurrencyRupee as CurrencyRupeeIcon, DateRange } from '@mui/icons-material';

const Offline = () => {

  const { backendUrl } = useContext(DataContext)

// -----------------------------------------------------------------

  const dataFormat = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

// -----------------------------------------------------------------

  const [memberData, setMemberData] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")


  const [confirmModal, setConfirmModal] = useState(false)
  const [months, setMonths] = useState(1);
  const [confirmMsg, setConfirmMsg] = useState({
    name:"",
    phoneNumber:""
  })
  const [confirmloading, setConfirmLoading] = useState(false)
  const [modalMsg, setModalMsg] = useState({open:false, msg:"", severity:""})
  const [searchText, setSearchText] = useState("")

// -----------------------------------------------------------------

  const handleIncrement = () => setMonths(prev => prev + 1);

  const handleDecrement = () => setMonths(prev => (prev > 1 ? prev - 1 : 1));

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setMonths(value);
    } else if (e.target.value === '') {
      setMonths(''); 
    }
  };

// -----------------------------------------------------------------

  const paymentDone = async(data) => {
    const serverResponse = {
      name:data.name,
      phoneNumber:data.phoneNumber,
      months
    }

    try {
      const response = await axios.post(`${backendUrl}/Payment-Status-Updated`, serverResponse)
      if(response.status === 200){
        setModalMsg({open:true, msg:response.data.message, severity:"success"})
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response?.data?.message || "Check your connections! Try later.", severity:"error"})
    } finally {
      setConfirmLoading(false)
      setConfirmModal(false)
    }
  }

// -----------------------------------------------------------------

  const filteredData = memberData
  .filter((data) => data.activeStatus === "false")
  .filter((data) => data.name.toLowerCase().includes(searchText.toLowerCase()))


  useEffect(() => {
    setLoading(true)
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/Fetching-Members`);
        if (response.status === 200) {
          setMemberData(response.data);
        }
      } catch (error) {
        setErrorMsg(error.response?.data?.message || "Check your connections! Try later.");
      } finally {
        setLoading(false)
      }
    };
    fetchMembers();
  }, [backendUrl]); 

  return (
    <>
    <Layout>

    <Box className="h-screen w-screen bg-gradient-to-r from-red-900 via-black to-red-900 overflow-auto">

    <Box className="px-2">
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        className="my-2"
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
      </Box>

    <Table className="bg-white/30 backdrop-blur-md">
      <TableHead>
        <TableRow>
          <TableCell className="font-bold text-white">Name</TableCell>
          <TableCell className="font-bold text-white">Last Comed</TableCell>
          <TableCell className="font-bold text-white">Contact</TableCell>
          <TableCell className="font-bold text-white">Active</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {memberData.filter((data) => data.activeStatus === "false").length === 0 ? (
        <TableRow>
          <TableCell colSpan={4} className="text-center text-white font-bold">
            No Data Available
          </TableCell>
        </TableRow>
      ) : (
        filteredData
          .map((data) => (
            <TableRow key={data._id} className="bg-red-500/30 backdrop-blur-md">
              <TableCell className="text-black font-bold">{data.name}</TableCell>
              <TableCell className="text-black font-bold">
                {new Date(data.nextDueDate).toLocaleDateString("en-GB", dataFormat)}
              </TableCell>
              <TableCell className="text-black font-bold">{data.phoneNumber}</TableCell>
              <TableCell 
              onClick={() => {setConfirmModal(true); setConfirmMsg({
                name:data.name,
                phoneNumber:data.phoneNumber
              })}}
              className="text-black font-bold">
                <GiConfirmed />
              </TableCell>
            </TableRow>
          )))}
      </TableBody>
      </Table>
    </Box>

{/* -------------------------- PAYMENT STATUS UPDATE ------------------------------- */}
{/* -------------------------- PAYMENT STATUS UPDATE ------------------------------- */}
{/* -------------------------- PAYMENT STATUS UPDATE ------------------------------- */}

    <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>
    <DialogTitle className="text-center">
      <CurrencyRupeeIcon className="text-green-600 mb-1" />
      <span className="text-green-600 font-bold"> Payment Confirmation </span>
    </DialogTitle>

    <DialogContent className="text-lg flex flex-col items-center gap-4">
      <b>{confirmMsg.name}</b>

      <div className="flex items-center gap-2">
        <Typography className="font-extrabold">Months Paid</Typography>
        <IconButton onClick={handleDecrement} className="bg-gray-200 hover:bg-gray-300">
          <Remove />
        </IconButton>

        <TextField
          type="number"
          value={months}
          onChange={handleInputChange}
          inputProps={{ min: 1 }}
          className="w-20 text-center"
          variant="outlined"
          size="small"
        />

        <IconButton onClick={handleIncrement} className="bg-gray-200 hover:bg-gray-300">
          <Add />
        </IconButton>
      </div>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => setConfirmModal(false)}>Cancel</Button>
      {confirmloading ? (
        <CircularProgress size={20} className="mr-4"/>
      ) : (
        <Button 
        onClick={() => paymentDone(confirmMsg)}
        className="text-green-500 font-bold">
          Confirm
        </Button>
      )}
    </DialogActions>
    </Dialog>

{/* ------------------------------- SNACKBAR ------------------------------- */}
{/* ------------------------------- SNACKBAR ------------------------------- */}
{/* ------------------------------- SNACKBAR ------------------------------- */}

    <Snackbar
    open={modalMsg.open}
    className='mt-4 '
    autoHideDuration={3000}
    onClose={() => setModalMsg({...modalMsg, open:false})}
    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
  >
    <Alert 
    className="bg-white text-black"
    onClose={() => setModalMsg({...modalMsg, open:false})} severity={modalMsg.severity} sx={{ width: '100%' }}>
      <b className='text-[17px]'>{modalMsg.msg}</b>
    </Alert>
  </Snackbar>

    </Layout>  
    </>
  )
}

export default Offline

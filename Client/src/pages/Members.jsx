import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { DataContext } from '../Context/DataProvider';

import { GiConfirmed } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { Add, Remove, CurrencyRupee as CurrencyRupeeIcon, DateRange } from '@mui/icons-material';

const Members = () => {
  const { backendUrl } = useContext(DataContext);

// -----------------------------------------------------------------------------

  const dataFormat = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

// -----------------------------------------------------------------------------

  const [loading, setLoading] = useState(false);
  const [offlineLoading, setOfflineLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  const [offlineModal, setOfflineModal] = useState(false)
  const [offlineMsg, setOfflineMsg] = useState({
    name:"",
    phoneNumber:""
  })
  const [confirmModal, setConfirmModal] = useState(false)
  const [months, setMonths] = useState(1);
  const [confirmMsg, setConfirmMsg] = useState({
    name:"",
    phoneNumber:""
  })
  const [confirmloading, setConfirmLoading] = useState(false)
  const [memberData, setMemberData] = useState([]);
  const [modalMsg, setModalMsg] = useState({open:false, msg:"", severity:""})

  // console.log(offlineName);

// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------

  const updateMember = async(data) => {
    setOfflineLoading(true)
    const serverResponse = {
      name:data.name,
      phoneNumber:data.phoneNumber
    }

    try {
      const response = await axios.post(`${backendUrl}/Add-Member-Active-ness`, serverResponse)
      if (response.status === 200){
        setModalMsg({open:true, msg:response.data.message, severity:"success"})
      }
    } catch (error) {
      setModalMsg({open:true, msg:error.response.data.message, severity:"success"})
    } finally{
      setOfflineLoading(false)
      setOfflineModal(false)
    }
  }

// -----------------------------------------------------------------------------

  const paymentDone = async(data) => {
    setConfirmLoading(true)
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

// -----------------------------------------------------------------------------

const getRowBackgroundColor = (nextDueDate) => {
  const currentDate = new Date();
  const dueDate = new Date(nextDueDate);

  const timeDiff = dueDate - currentDate;
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); 

  if (dayDiff <= 2 && dayDiff >= 0) {
    return 'bg-yellow-500/30 backdrop-blur-md';  
  } 
  else if (dayDiff < 0) {
    return 'bg-red-500/30 backdrop-blur-md';
  }
  else {
    return 'bg-green-500/30 backdrop-blur-md';
  }
};



  return (
    <Layout>
      <Box className="h-screen w-screen bg-gradient-to-r from-red-900 via-black to-red-900 overflow-auto">
        {loading ? (
          <Box className="h-[300px] w-screen flex justify-center items-center">
            <CircularProgress className="text-white"/>
          </Box>
        ): errorMsg ? (
          <Typography className="text-xl text-center mt-10 font-bold text-white">
            {errorMsg}
          </Typography>
        ) : (
          <Table className="bg-white/30 backdrop-blur-md">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-white">Name</TableCell>
              <TableCell className="font-bold text-white">Join Date</TableCell>
              <TableCell className="font-bold text-white">Next Date</TableCell>
              <TableCell className="font-bold text-white">Offline</TableCell>
              <TableCell className="font-bold text-white">Done</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memberData
            .filter((data) => data.activeStatus !== "false")
            .map((data) => (
              <TableRow key={data._id} className={getRowBackgroundColor(data.nextDueDate)}>
                <TableCell className="font-bold text-[15px]">{data.name}</TableCell>
                <TableCell className="font-bold text-[15px]">{new Date(data.joinDate).toLocaleDateString("en-GB", dataFormat)}</TableCell>
                <TableCell className="font-bold text-[15px]">{new Date(data.nextDueDate).toLocaleDateString("en-GB", dataFormat)}</TableCell>
                <TableCell onClick={() => {setOfflineModal(true); setOfflineMsg({
                  name:data.name,
                  phoneNumber:data.phoneNumber
                  })}}>
                  <Box>
                    <span className="text-2xl"><ImCancelCircle/></span>
                  </Box>
                </TableCell>
                <TableCell onClick={() => {setConfirmModal(true); setConfirmMsg({
                  name:data.name,
                  phoneNumber:data.phoneNumber
                })}}>
                  <Box>
                    <span className="text-2xl"><GiConfirmed/></span>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </Box>

{/* ------------------------------- OFFLINE MODAL ----------------------------------- */}
{/* ------------------------------- OFFLINE MODAL ----------------------------------- */}
{/* ------------------------------- OFFLINE MODAL ----------------------------------- */}

  <Dialog open={offlineModal} onClose={() => setOfflineModal(false)}>
    <DialogTitle className="text-center">
     <span><PersonAddDisabledIcon className="text-red-600 mb-1 mr-2"/></span>
     <span className="text-red-600 font-bold">Offline Confirmation</span>
    </DialogTitle>
    <DialogContent className="text-lg">
      Ar you sure to want to offline <b>{offlineMsg.name}</b>?
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOfflineModal(false)}>
        Cancel
      </Button>
      {offlineLoading ? (
        <CircularProgress size={20} className="mr-4"/>
      ):(
        <Button 
        onClick={() => updateMember(offlineMsg)}
        className="text-red-500">
          Confirm
        </Button>
      )}
    </DialogActions>
  </Dialog>

{/* --------------------------- PAYMENT CONFIRM MODAL ------------------------------- */}
{/* --------------------------- PAYMENT CONFIRM MODAL ------------------------------- */}
{/* --------------------------- PAYMENT CONFIRM MODAL ------------------------------- */}

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
  );
};

export default Members;
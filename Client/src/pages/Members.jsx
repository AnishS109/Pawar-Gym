import React from 'react'
import Layout from '../Layout/Layout'
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

const Members = () => {
  return (
    <>
    <Layout>
      <Box className="h-screen w-screen bg-gradient-to-r 
    from-red-900 via-black to-red-900">

      <Table className='bg-white'>
        <TableHead>
          <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Join Date</TableCell>
          <TableCell>Next Date</TableCell>
          <TableCell>Offline</TableCell>
          <TableCell>Done</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className='bg-red-500'>
          <TableCell>Anish Saini</TableCell>
          <TableCell>5/02/25</TableCell>
          <TableCell>6/05/25</TableCell>
          <TableCell>X</TableCell>
          <TableCell>Done</TableCell>
          </TableRow>
          <TableRow className='bg-green-500'>
          <TableCell>Anish Saini</TableCell>
          <TableCell>5/02/25</TableCell>
          <TableCell>6/05/25</TableCell>
          <TableCell>X</TableCell>
          <TableCell>Done</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      </Box>
    </Layout> 
    </>
  )
}

export default Members

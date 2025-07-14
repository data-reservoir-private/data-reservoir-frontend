import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import { BsCopy } from "react-icons/bs";
import CopyButton from '../CopyButton';

interface GridDetailProps {
  data: Record<string, React.ReactNode | boolean>
}

export default function TableDetail(props: GridDetailProps) {
  return (
    <TableContainer className='py-2'>
      <Table size='small' className='text-sm w-full'>
        <TableBody>
          {
            Object.entries(props.data).map(([key, value]) => (
              <TableRow key={key} className='text-sm'>
                <TableCell size='small' className='text-sm bg-white/20 w-[20%] font-bold'>{key}</TableCell>
                <TableCell className='text-sm overflow-clip'>
                  {
                    typeof (value) === 'boolean' ? (<Checkbox className='p-0' disabled checked={value} />) : 
                      (key === "ID" && typeof(value) === 'string') ? (
                        <Box className="flex justify-between">
                          <Typography className='text-sm' fontFamily='inconsolata'>{ value }</Typography>
                          <CopyButton value={value}/>
                        </Box>
                      ) : (value)
                  }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

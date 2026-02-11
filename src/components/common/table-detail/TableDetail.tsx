import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import CopyButton from '../CopyButton';
import Tooltip from '@mui/material/Tooltip';
import classNames from 'classnames';

interface GridDetailProps {
  data: Record<string, React.ReactNode | boolean | string[]>
}

export default function TableDetail(props: GridDetailProps) {
  return (
    <TableContainer className='py-2'>
      <Table size='small' className='text-sm w-full'>
        <TableBody>
          {
            Object.entries(props.data).filter(([_, value]) => !!value).map(([key, value]) => (
              <TableRow key={key} className='text-sm'>
                {/* If it ends with *, it is non-canonical. Mark with special effects */}
                <TableCell size='small' className={classNames('text-sm bg-white/20 w-[20%] font-bold', {
                  'italic text-gray-500': key.endsWith('*')
                })}>
                  {key.endsWith('*') ? (
                    <Tooltip title="Non-Canonical Data">
                      <span>{key.slice(0, -1)}</span>
                    </Tooltip>
                  ) : key}
                </TableCell>
                <TableCell className={classNames('text-sm overflow-clip', {
                  'italic text-gray-500': key.endsWith('*') 
                })}>
                  {
                    typeof (value) === 'boolean' ? (<Checkbox aria-label={key} className='p-0' disabled checked={value} />) : 
                      (key === "ID" && typeof(value) === 'string') ? (
                        <Box className="flex justify-between">
                          <Typography className='text-sm' fontFamily='inconsolata'>{ value }</Typography>
                          <CopyButton value={value}/>
                        </Box>
                      ) :
                        Array.isArray(value) ? (value.join(', ')) : (value)
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

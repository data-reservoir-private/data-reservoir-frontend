'use client'

import { themeOptions } from '@/theme';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react'
import { BsMenuApp } from 'react-icons/bs';
import { DrawerOptions } from './DrawerOptions';
import PersonalInfo from './PersonalInfo';

export default function AuthLayout() {
  const [open, setOpen] = useState(false);
  const handleOnClose = () => { setOpen(false) }
  const smol = useMediaQuery(themeOptions.breakpoints.down('sm'), {
    ssrMatchMedia: () => ({ matches: true })
  });

  return (
    <Box className='grow'>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundImage: 'none' }} className='bg-background-paper shadow-none border-b-divider border-b' >
        <Toolbar variant='dense'>
          {
            smol && <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              className='m-2'
              onClick={() => setOpen(!open)}
            >
              <BsMenuApp />
            </IconButton>
          }
          <Typography variant='h6' component="div" className='grow font-bold'>Data Reservoir</Typography>
          <PersonalInfo/>
        </Toolbar>
      </AppBar>
      <Drawer variant={smol ? 'temporary' : 'permanent'}
        anchor='left'
        className='w-full'
        open={open}
        slotProps={{
          paper: {
            className: 'box-border',
            sx: {
              scrollbarWidth: 'none'
            }
          }
        }}
        onClose={() => setOpen(false)}
      >
        <Toolbar variant='dense' />
        <DrawerOptions onClose={handleOnClose} />
      </Drawer>
    </Box>
  );
}

'use client'

import { ROUTES } from '@/constant/route';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsMenuApp } from 'react-icons/bs';
import { Logout } from './logout/actions';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);
  const handleOnClose = () => { setOpen(false) }
  const smol = useMediaQuery('(max-width:600px)');

  return (
    <div className='flex-grow'>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundImage: 'none' }} className='bg-background-paper shadow-none border-b-divider border-b' >
        <Toolbar variant='dense'>
          {
            smol && <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              className='mr-2'
              onClick={() => setOpen(!open)}
            >
              <BsMenuApp />
            </IconButton>
          }
          <Typography variant='h6' component="div" className='flex-grow font-bold'>
            Data Reservoir
          </Typography>
          <Skeleton variant='circular' width={20} height={20} className='bg-green-400' animation='pulse' title='API is online' />
        </Toolbar>
      </AppBar>
        <Drawer variant={smol ? 'temporary' : 'permanent'}
          anchor='left'
          className='w-full'
          open={open}
          slotProps={{
            paper: {
              className: 'box-border'
            }
          }}
          onClose={() => setOpen(false)}
        >
          <Toolbar variant='dense' />
          <DrawerOptions onClose={handleOnClose} />
        </Drawer>
        <div className='relative min-sm:left-[250px] min-sm:w-[calc(100%-250px)] p-2 min-h-[100svh]'>
          <Toolbar variant='dense' />
          <div className='p-4'>
            {children}
          </div>
        </div>
    </div>
  );
}

function DrawerOptions({ onClose }: { onClose: () => void }) {
  return (
    <div className='w-[250px] h-full'>
      <div className='flex flex-col h-full p-3 max-sm:px-2 justify-between'>
        <div>
          {
            ROUTES.map((x, idx) => (
              <div className='py-1' key={idx}>
                {
                  x.map((route) => (
                    <ListItem key={route.id} onClick={() => onClose()} className='p-0'>
                      <ListItemButton className='rounded p-0 mx-2' disabled={route.inactive} component={Link} href={route.link} >
                        <ListItemIcon className='flex justify-center items-center gap-3 w-full p-2 rounded'>
                          <route.icon className='text-xl' />
                          <ListItemText primary={route.name} />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  ))
                }
              { idx !== ROUTES.length - 1 && <Divider/> }
              </div>
            ))
          }
        </div>
        <form action={Logout}>
          <Link href={'/logout'} passHref>
            <Button type='button' color='error' className='w-full shadow-none opacity-50' variant='contained'>Logout</Button>
          </Link>
        </form>
      </div>
    </div>
  )
}
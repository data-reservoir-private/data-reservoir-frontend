import { IData } from '@/constant/data'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'
import { BsTable } from 'react-icons/bs'
import Section from '../paper/Section'
import Paper from '../paper/Paper'
import Image from 'next/image'

interface SimpleQuickLinkProps {
  quickLink: IData;
}

export default function SimpleQuickLink({ quickLink }: SimpleQuickLinkProps) {
  return (
    <Section variant='h6' name='Quick Link'>
      <Grid container spacing='1rem' columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        {
          quickLink.categories.map((nav) => (
            <Grid size={1} key={nav.name}>
              <Link passHref href={nav.link}>
                <Paper className='p-2 cursor-pointer hover:bg-background-paper/50 flex flex-col gap-3 items-center'>
                  <Box className='h-[80px] flex items-center'>
                    {
                      (nav.image && typeof (nav.image) === 'string') ? <Image src={nav.image} alt={nav.name} width={80} height={80} className='rounded-sm' />
                        : (nav.image && typeof (nav.image) !== 'string') ? nav.image() :
                          <BsTable className='text-[60px] text-gray-500' />
                    }
                  </Box>
                  <Typography className='font-bold'>{nav.name}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  )
}

import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ThreePCGem() {
  const { data } = await grabData<ITheSimsResponse['three-pc-gem'][]>(API_ROUTE.THE_SIMS.THREE_PC_GEM, { pageSize: 0 });

  return (
    <Box display='flex' gap='1rem' flexDirection='column'>
      <Typography variant='h4' fontWeight='bold'>Three PC Gems</Typography>
      <Divider />
      <Grid container spacing='1rem' columns={12}>
        {
          data.map((d) => (
            <Grid key={d.id}>
              <Link passHref href={`/the-sims/castaway-product/${d.id}`}>
                <Paper className='p-1 flex relative'>
                  <Box className='w-20 h-20 relative'>
                    <Image src={d.image} alt={d.id} fill quality={90} className='rounded-sm object-contain'/>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}

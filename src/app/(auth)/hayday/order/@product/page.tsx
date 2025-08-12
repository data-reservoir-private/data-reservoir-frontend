import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http';
import React from 'react'
import { HaydayOrderFormSchema } from '../form';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import SimpleImage from '@/components/common/SimpleImage';
import Paper from '@/components/common/paper/Paper';
import Typography from '@mui/material/Typography';

export default async function ProductPage() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  const { data } = await grabData<IHaydayResponse['hayday-order']['product'][]>(API_ROUTE.HAY_DAY.ORDER.PRODUCT, {
    month: sp.month,
    year: sp.year,
    isProcessed: sp.isProcessed === 1 ? 'true' : undefined
  });

  if (!data || data.length == 0) {
    return (
      <Paper className='w-full flex justify-center items-center p-2'>
        <Typography>No data</Typography>
      </Paper>
    )
  }

  return (
    <Box className='flex flex-col gap-3'>
      <Typography>Displays the amount requested per order and total amount requested. You can filter so only processed products will be displayed by toggling the checkbox above</Typography>
      <Grid container gap='.25rem' columns={10} justifyContent={'space-evenly'}>
        {
          data.map(product => (
            <Link passHref href={`/hayday/product/${product.id}`} key={product.id} title={product.name}>
              <ButtonBase type='button'>
                <Paper className='flex flex-col'>
                  <Box className='w-15 h-15 relative bg-background-default p-1'><SimpleImage src={product.image} alt={product.name} /></Box>
                  <Typography variant='body1' className='font-bold'>{product.average.toPrecision(3)}</Typography>
                  <Typography variant='subtitle2'>{product.quantity}</Typography>
                </Paper>
              </ButtonBase>
            </Link>
          ))
        }
      </Grid>
    </Box>
  )
}

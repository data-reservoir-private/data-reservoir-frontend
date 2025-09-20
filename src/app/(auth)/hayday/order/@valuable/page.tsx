import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http';
import { HaydayOrderFormSchema } from '../form';
import Grid from '@mui/material/Grid';
import Paper from '@/components/common/paper/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Link from 'next/link';
import SimpleImage from '@/components/common/SimpleImage';
import { BsPlusCircleFill, BsStarFill } from 'react-icons/bs';
import { GiTwoCoins } from 'react-icons/gi';

export default async function ValuableOrder() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  const { data } = await grabData<IHaydayResponse['hayday-order']['valuable'][]>(API_ROUTE.HAY_DAY.ORDER.VALUABLE, sp);

  if (!data || data.length == 0) {
    return (
      <Paper className='w-full flex justify-center items-center p-2'>
        <Typography>No data</Typography>
      </Paper>
    )
  }

  return (
    <Grid container spacing='1rem' columns={{ xs: 1, md: 2, lg: 3 }}>
      {
        data.map((v, idx) => (
          <Grid size={1} key={idx}>
            <Paper className='p-2 flex flex-col gap-2'>
              <Box className='flex justify-between items-center'>
                <Typography variant='body2' className='font-bold'>{v.clientName}</Typography>
                <Box className='flex gap-3'>
                  <Box className='flex gap-1 items-center'>
                    <GiTwoCoins/>
                    <Typography variant='subtitle2'>{v.coin}</Typography>
                  </Box>
                  <Box className='flex gap-1 items-center'>
                    <BsStarFill/>
                    <Typography variant='subtitle2'>{v.xp}</Typography>
                  </Box>
                  <Box className='flex gap-1 items-center'>
                    <BsPlusCircleFill/>
                    <Typography variant='subtitle2'>{v.coin + v.xp}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className='flex justify-between'>
                {
                  v.products.map(pr => (
                    <Link passHref href={`/hayday/product/${pr.id}`} key={pr.id} title={pr.name}>
                      <ButtonBase type='button' className='w-full'>
                        <Paper className='w-full flex gap-1 px-1 items-center'>
                          <Box className='w-7 h-7 relative'><SimpleImage src={pr.image} alt={pr.name} /></Box>
                          <Typography variant='subtitle1'>{pr.quantity}</Typography>
                        </Paper>
                      </ButtonBase>
                    </Link>
                  ))
                }
              </Box>
            </Paper>
          </Grid>
        ))
      }
    </Grid>
  )
}

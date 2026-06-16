import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http';
import { HaydayOrderFormSchema } from '../form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@/components/common/paper/Paper';
import Box from '@mui/material/Box';
import { GiTwoCoins } from 'react-icons/gi';
import { BsPlusCircleFill, BsStarFill } from 'react-icons/bs';

const mapping: Record<string, string> = {
  "Ben's Brewery": '/image/hayday/client/ben.png',
  "Church": '/image/hayday/client/church.png',
  "Fabio's Fishery": '/image/hayday/client/fabio.png',
  "Frank's Factory": '/image/hayday/client/frank.png',
  "Joan's Salon": '/image/hayday/client/joan.png',
  "Kindergarten": '/image/hayday/client/kindergarten.png',
  "Mike's Mill": '/image/hayday/client/mike.png',
  "School": '/image/hayday/client/school.png',
  "Susan's Store": '/image/hayday/client/susan.png',
  "Grant's Graveyard": '/image/hayday/client/grant.png'
};

export default async function ClientPage() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  const { data } = await grabData<IHaydayResponse['hayday-order']['client'][]>(API_ROUTE.HAY_DAY.ORDER.CLIENT, sp);
  return (
    <Grid container spacing='1rem' columns={{ xs: 1, lg: 2 }}>
      {
        data.map(client => (
          <Grid size={1} key={client.name}>
            <Box className='relative'>
              <Paper className='relative top-0 flex flex-col p-3 bg-transparent bg-linear-to-r from-background-paper to-background-paper/80 z-2'>
                <Box>
                  <Box className='flex justify-between items-center'>
                    <Typography variant='h6' className='font-bold'>{client.name}</Typography>
                    <Typography variant='body1' className='font-bold'>{client.percentageAcceptedOrder}% ({client.acceptedOrder} / {client.settledOrder})</Typography>
                  </Box>
                  <Box className='flex flex-col gap-.5'>
                    <Box className='flex gap-3 items-center'>
                      <Typography variant='subtitle1'><BsPlusCircleFill /></Typography>
                      <Typography variant='subtitle1'>{client.revenue}</Typography>
                    </Box>
                    <Box className='flex gap-3 items-center'>
                      <Typography variant='subtitle2'><GiTwoCoins /></Typography>
                      <Typography variant='subtitle2'>{client.coin}</Typography>
                    </Box>

                    <Box className='flex gap-3 items-center'>
                      <Typography variant='subtitle2'><BsStarFill /></Typography>
                      <Typography variant='subtitle2'>{client.xp}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* Background */}
              <Box className='absolute top-0 w-full h-full z-1'>
                <img className='w-full h-full' src={mapping[client.name]} alt='Nope'/>
              </Box>
            </Box>
          </Grid>
        ))
      }

    </Grid>
  );
}

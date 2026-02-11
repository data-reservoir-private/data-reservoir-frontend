import { getSearchParam, grabData } from '@/utilities/http';
import React from 'react'
import { HaydayOrderFormSchema } from '../form';
import { IHaydayResponse } from '@/model/response/hayday';
import { API_ROUTE } from '@/constant/api-route';
import Paper from '@/components/common/paper/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IoStar } from "react-icons/io5";
import { FaClipboardCheck } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import SimpleImage from '@/components/common/SimpleImage';
import classNames from 'classnames';
import ButtonBase from '@mui/material/ButtonBase';
import Link from 'next/link';
import { EChartsOption } from 'echarts';
import { EChart } from '@/components/common/chart/Chart';

export default async function OrderSummary() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  const { data } = await grabData<IHaydayResponse['hayday-order']['summary']>(API_ROUTE.HAY_DAY.ORDER.SUMMARY, sp);

  const vouchers = [
    { name: 'Green Voucher', image: '/image/hayday/green.png', total: data?.voucher?.green ?? 0, className: 'from-green-700 to-green-600' },
    { name: 'Blue Voucher', image: '/image/hayday/blue.png', total: data?.voucher?.blue ?? 0, className: 'from-sky-700 to-sky-600' },
    { name: 'Purple Voucher', image: '/image/hayday/purple.png', total: data?.voucher?.purple ?? 0, className: 'from-purple-700 to-purple-600' },
    { name: 'Gold Voucher', image: '/image/hayday/gold.png', total: data?.voucher?.gold ?? 0, className: 'from-yellow-700 to-yellow-600' },
  ];

  return (
    <Box className='flex flex-col gap-4'>
      {/* Percentage acc / coin / XP */}
      <Grid container spacing='1rem' columns={{ xs: 1, md: 3 }}>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-green-700 to-green-400 border-none'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{data?.percentageAcceptedOrder ?? 0}%</Typography>
              <Typography variant='subtitle1'>Accepted</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <FaClipboardCheck />
            </Box>
          </Paper>
        </Grid>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-sky-600 to-sky-300 border-none'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{data?.xp ?? 0}</Typography>
              <Typography variant='subtitle1'>Experiences</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <IoStar />
            </Box>
          </Paper>
        </Grid>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-orange-500 to-yellow-500  border-none'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{data?.coin ?? 0}</Typography>
              <Typography variant='subtitle1'>Coins</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <GiTwoCoins />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Vouchers */}
      <Grid container spacing='1rem' columns={{ xs: 2, lg: 4 }}>
        {
          vouchers.map(x => (
            <Grid size={1} key={x.name}>
              <Paper className={classNames('flex justify-between p-1 px-3 items-center border-none bg-linear-to-r', x.className)} key={x.name}>
                <Box className='flex flex-col'>
                  <Typography variant='h5' className='font-bold'>{x.total}</Typography>
                  <Typography variant='subtitle2'>{x.name}</Typography>
                </Box>

                <Box className='relative w-15 h-15'>
                  <SimpleImage src={x.image} alt={x.name} className='p-2' />
                </Box>
              </Paper>
            </Grid>
          ))
        }
      </Grid>

      {/* Material and Bar */}
      <Grid container spacing='1rem' columns={{ xs: 1, md: 2 }}>
        {/* Material */}
        <Grid size={1}>
          <Paper className='flex flex-col p-2 gap-2 min-h-55'>
            {
              (!data?.materials || data.materials.length === 0) && (
                <Box className='flex w-full h-full justify-center items-center'>
                  <Typography>No Materials Obtained 😭</Typography>
                </Box>
              )
            }
            {
              data?.materials && data.materials.map(m => (
                <Link passHref key={m.id} href={`/hayday/product/${m.id}`}>
                  <ButtonBase type='button' className='w-full'>
                    <Paper className='flex justify-between items-center p-2 w-full' key={m.id}>
                      <Box className='flex items-center'>
                        <Box className='relative w-7 h-7'>
                          <SimpleImage src={m.image} alt={m.name} />
                        </Box>
                        <Typography variant='subtitle2'>{m.name}</Typography>
                      </Box>
                      <Typography variant='h6' className='font-bold'>{m.quantity}</Typography>
                    </Paper>
                  </ButtonBase>
                </Link>
              ))
            }
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid size={1}>
          <Paper className='min-h-55'>
            <PieAccRejChart accept={data?.acceptedOrder ?? 0} reject={data?.rejectedOrder ?? 0}/>
          </Paper>
        </Grid>

      </Grid>

    </Box>
  )
}

function PieAccRejChart({ accept, reject }: { accept: number, reject: number }) {
  const opt: EChartsOption = {
    series: [
      {
        type: 'pie',
        data: [
          { value: accept, name: 'Accepted' },
          { value: reject, name: 'Rejected' },
        ],
        label: {
          color: 'white',
        }
      }
    ],
    color: ['#008236', '#c10007']
  }

  return <EChart option={opt} className='w-full min-h-50'/>
}
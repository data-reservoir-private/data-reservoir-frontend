import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route'
import { IDashboardResponse } from '@/model/response/dashboard'
import { grabData } from '@/utilities/http'
import Box from '@mui/material/box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BsTable } from "react-icons/bs";
import { EChartsOption } from 'echarts'
import { EChart } from '@/components/common/chart/Chart'
import { FaTruck } from "react-icons/fa6";
import Section from '@/components/common/paper/Section'
import { Metadata } from 'next'
import { QUICK_LINKS } from '@/constant/quick-link'

export const metadata: Metadata = {
  title: 'Farm Frenzy - Data Reservoir'
}

export default async function Page() {
  const { data } = await grabData<IDashboardResponse>(`${API_ROUTE.DASHBOARD}/farm_frenzy`);

  return (
    <Section variant='h4' name='Farm Frenzy'>
      {/* Ini Table dan Rows */}
      <Grid container spacing='1rem' columns={{ xs: 1, md: 2 }}>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-orange-700 to-orange-400 border-none gap-2'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{data.rows}</Typography>
              <Typography variant='subtitle2'>Records</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <BsFillGrid3X3GapFill />
            </Box>
          </Paper>
        </Grid>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-green-700 to-green-400 border-none'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{data.tables.length}</Typography>
              <Typography variant='subtitle2'>Tables</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <BsTable />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper className='p-2'>
        <DataChart data={data}/>
      </Paper>

      <Section name='Quick Link' variant='h6'>
        <Grid container spacing='1rem' columns={{ xs: 1, sm: 2, md: 3 }}>
          {
            QUICK_LINKS['farm-frenzy'].map((nav) => (
              <Grid size={1} key={nav.name}>
                <Link passHref href={nav.link}>
                  <Paper className='p-2 cursor-pointer hover:bg-background-paper/50 flex flex-col gap-3 items-center'>
                    <Box className='h-[80px] flex items-center'>
                      {
                        (nav.image && typeof (nav.image) === 'string') ? <Image src={nav.image} alt={nav.name} width={80} height={80} className='rounded-sm' />
                          : (nav.image && typeof (nav.image) !== 'string') ? nav.image() :
                              <FaTruck className='text-[60px] text-gray-500' />
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
    </Section>
  )
}

function DataChart({ data }: { data: IDashboardResponse }) {
  const opt: EChartsOption = {
    xAxis: {
      type: 'category',
      show: false,
      data: data.tables.map(x => x.tableURL)
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data.tables.map(x => x.rowCount),
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          color: 'white'
        }
      }
    ],
    tooltip: {
      show: true
    },
    grid: {
      top: 40,
      left: 40,
      right: 40,
      bottom: 40,
    },
  }

  return (
    <EChart className='w-full h-[300px]' option={opt}/>
  );
}

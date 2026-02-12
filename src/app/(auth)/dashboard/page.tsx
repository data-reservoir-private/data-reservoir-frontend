import Section from '@/components/common/paper/Section'
import { API_ROUTE } from '@/constant/api-route';
import { IDashboardResponse } from '@/model/response/dashboard';
import { grabData } from '@/utilities/http';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { cache } from 'react'
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { IoMdDocument } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { EChartsOption } from 'echarts';
import { EChart } from '@/components/common/chart/Chart';
import Paper from '@/components/common/paper/Paper';
import { Metadata } from 'next';
import { DATASETS_AVAILABLE } from '@/constant/data';

export const metadata: Metadata = {
  title: 'Dashboard - Data Reservoir'
}

export default async function Dashboard() {
  const { data } = await grabData<IDashboardResponse[]>(`${API_ROUTE.DASHBOARD}`);

  const totalRecord = cache(() => data.reduce((acc, curr) => acc + curr.tables.reduce((a, c) => a + c.rowCount, 0), 0));
  const totalTable = cache(() => data.reduce((acc, curr) => acc + curr.tables.length, 0));

  const totalData = cache(() => data.reduce((acc, curr) => acc + curr.datasets.reduce((a, c) => a + c.total, 0), 0))
  const totalDatasets = cache(() => data.reduce((acc, curr) => acc + curr.datasets.length, 0));

  const totalPages = Object.values(DATASETS_AVAILABLE).reduce((acc, curr) => acc + curr.categories.length, 0);
  const totalCategory = data.length;

  return (
    <Section name='Dashboard' variant='h4'>

      <Grid container spacing='1rem' columns={{ xs: 1, md: 2, lg: 4 }}>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-orange-700 to-orange-400 border-none'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{totalData()}</Typography>
              <Typography variant='subtitle2' component='h5'>Entries</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <FaThList />
            </Box>
          </Paper>
        </Grid>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-green-700 to-green-400 border-none'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{totalDatasets()}</Typography>
              <Typography variant='subtitle2' component='h5'>Datasets</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <BsFillGrid3X3GapFill />
            </Box>
          </Paper>
        </Grid>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-slate-600 to-slate-400 border-none'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{totalPages}</Typography>
              <Typography variant='subtitle2' component='h5'>Pages</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <IoMdDocument />
            </Box>
          </Paper>
        </Grid>
        <Grid size={1}>
          <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-sky-600 to-sky-400 border-none'>
            <Box flexDirection='column'>
              <Typography variant='h4' fontWeight='bold'>{totalCategory}</Typography>
              <Typography variant='subtitle2' component='h5'>Categories</Typography>
            </Box>
            <Box component='div' className='h-full flex items-center justify-center text-5xl'>
              <MdCategory />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Paper>
        <DatasetTreeChart data={data} />
      </Paper>

      <Section name='Database' variant='h6' className='flex flex-col gap-4'>
        <Grid container spacing='1rem' columns={{ xs: 1, md: 2 }}>
          <Grid size={1}>
            <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-orange-700 to-orange-400 border-none'>
              <Box flexDirection='column'>
                <Typography variant='h4' fontWeight='bold'>{totalRecord()}</Typography>
                <Typography variant='subtitle2' component='h5'>Records</Typography>
              </Box>
              <Box component='div' className='h-full flex items-center justify-center text-5xl'>
                <FaThList />
              </Box>
            </Paper>
          </Grid>
          <Grid size={1}>
            <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-green-700 to-green-400 border-none'>
              <Box flexDirection='column'>
                <Typography variant='h4' fontWeight='bold'>{totalTable()}</Typography>
                <Typography variant='subtitle2' component='h5'>Tables</Typography>
              </Box>
              <Box component='div' className='h-full flex items-center justify-center text-5xl'>
                <BsFillGrid3X3GapFill />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Paper>
          <DBTreeChart data={data} />
        </Paper>
      </Section>
    </Section>
  )
}

function DatasetTreeChart({ data }: { data: IDashboardResponse[] }) {
  const opt: EChartsOption = {
    series: [
      {
        type: 'treemap',
        scaleLimit: {
          min: 1.1,
          max: 12
        },
        zoom: 1.1,
        visibleMin: 300,
        label: {
          show: true,
          formatter: '{b}'
        },
        data: data.map(category => ({
          name: category.category,

          children: category.datasets.map(table => ({
            name: `${category.category} ${table.name}`,
            value: table.total
          }))
        })),
        levels: [
          {
            itemStyle: {
              borderWidth: 0,
              gapWidth: 5,
              borderColor: 'transparent'
            }
          },
          {
            itemStyle: {
              gapWidth: 1,
              borderColor: 'transparent'
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              gapWidth: 1,
              borderColorSaturation: 0.6,
              borderColor: 'transparent'
            }
          }
        ]
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
    <EChart className='w-full h-75' option={opt} />
  );
}

function DBTreeChart({ data }: { data: IDashboardResponse[] }) {
  const opt: EChartsOption = {
    series: [
      {
        type: 'treemap',
        scaleLimit: {
          min: 1.1,
          max: 12
        },
        zoom: 1.1,
        visibleMin: 300,
        label: {
          show: true,
          formatter: '{b}'
        },
        data: data.map(category => ({
          name: category.prefix,

          children: category.tables.map(table => ({
            name: table.tableURL,
            value: table.rowCount
          }))
        })),
        levels: [
          {
            itemStyle: {
              borderWidth: 0,
              gapWidth: 5,
              borderColor: 'transparent'
            }
          },
          {
            itemStyle: {
              gapWidth: 1,
              borderColor: 'transparent'
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              gapWidth: 1,
              borderColorSaturation: 0.6,
              borderColor: 'transparent'
            }
          }
        ]
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
    <EChart className='w-full h-75' option={opt} />
  );
}

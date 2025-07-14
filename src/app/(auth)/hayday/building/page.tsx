import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route'
import { IHaydayResponse } from '@/model/response/hayday';
import { grabData } from '@/utilities/http'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HaydayBuildingForm, { HaydayBuildingFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hayday Building - Data Reservoir'
}

type Props = {
  searchParams: Promise<HaydayBuildingFormSchema>;
}

export default async function HaydayBuilding(props: Props) {
  const sp = await props.searchParams;
  const { data, pagination } = await grabData<IHaydayResponse['hayday-building'][]>(API_ROUTE.HAY_DAY.BUILDING, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
    level: sp.level
  });

  return (
    <Section name='Hayday Buildings' variant='h4' >
      <HaydayBuildingForm param={sp} totalData={pagination?.totalData ?? 0}/>
      <Grid container spacing='1rem' columns={6} className="justify-evenly">
        {
          data.map((d) => (
            <Grid key={d.id}>
              <Link passHref href={`/hayday/building/${d.id}`}>
                <Paper className='p-1 flex relative'>
                  <Box className='w-40 h-40 relative'>
                    <Image src={d.image} alt={d.name} fill sizes='80px' className='rounded-sm h-auto object-contain'/>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  )
}

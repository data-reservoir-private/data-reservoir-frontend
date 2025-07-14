import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route'
import { IHaydayResponse } from '@/model/response/hayday';
import { grabData } from '@/utilities/http'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HaydayProductForm, { HaydayProductFormSchema } from './form';
import Section from '@/components/common/paper/Section';

type Props = {
  searchParams: Promise<HaydayProductFormSchema>;
}

export default async function HaydayProduct(props: Props) {
  const sp = await props.searchParams;
  const { data, pagination } = await grabData<IHaydayResponse['hayday-product'][]>(API_ROUTE.HAY_DAY.PRODUCT, {
    name: sp.name ?? "",
    category: sp.category ?? [],
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
    level: sp.level
  });

  return (
    <Section name='Hayday Products' variant='h4' >
      <HaydayProductForm param={sp} totalData={pagination?.totalData ?? 0}/>
      <Grid container spacing='1rem' columns={12} className="justify-evenly">
        {
          data.map((d) => (
            <Grid key={d.id}>
              <Link passHref href={`/hayday/product/${d.id}`}>
                <Paper className='p-1 flex relative'>
                  <Box className='w-20 h-20 relative'>
                    <Image src={d.image} alt={d.name} fill sizes='50px' className='rounded-sm h-auto object-contain'/>
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
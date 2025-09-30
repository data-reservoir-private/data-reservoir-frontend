import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Section from '@/components/common/paper/Section';
import React, { cache } from 'react'
import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';

interface FourPCDishDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['four-pc-dish'] | null>(`${API_ROUTE.THE_SIMS.FOUR_PC_DISH}/${id}`));

export async function generateMetadata(props: FourPCDishDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `The Sims Four PC Dish - ${post.data.name} - Data Reservoir`
  }
}

export default async function FourPCDishDetail(props: FourPCDishDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-four-pc-dish-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <Image src={data.image} alt={data.name} fill className='object-contain' />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Category: data.category
        }} />
      </Section>
    </Section>
  )
}
import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { cache } from 'react'
import Section from '@/components/common/paper/Section';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';

interface TwoPetsConsoleDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['two-pets-console-product'] | null>(`${API_ROUTE.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT}/${id}`));

export async function generateMetadata(props: TwoPetsConsoleDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `The Sims Two Pets Console Product - ${post.data.name} - Data Reservoir`
  }
}

export default async function TwoPetsConsoleDetail(props: TwoPetsConsoleDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-two-pets-console-product-detail'], { label: data.name }]}>
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
          Category: data.category,
          Price: !data.category.startsWith('Harvest') ? data.price : undefined,
          'Price*': data.category.startsWith('Harvest') ? data.price : undefined,
          Hunger: data.hunger,
          Bladder: data.bladder,
          Energy: data.energy,
          Description: data.description,
        }} />
      </Section>
    </Section>
  )
}

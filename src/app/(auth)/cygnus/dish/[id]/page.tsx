import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { cache } from 'react'
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { ICygnusResponse } from '@/model/response/cygnus';
import Typography from '@mui/material/Typography';
import SimpleImage from '@/components/common/SimpleImage';

interface DishDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ICygnusResponse['dish'] | null>(`${API_ROUTE.CYGNUS.DISH}/${id}`));

export async function generateMetadata(props: DishDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Cygnus Dish - ${post.data.name} - Data Reservoir`
  }
}

export default async function DishDetail(props: DishDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['cygnus-dish-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} unoptimized pixelated/>
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Description: data.description,
          Energy: data.energy,
          Health: data.health,
          Price: data.price,
          Ingredients: (
            <>
              {
                Object.entries(data.ingredients).map(([key, value]) => (
                  <Box key={key}>
                    <Typography className='text-sm'>{key}: {value}</Typography>
                  </Box>
                ))
              }
            </>
          )
        }} />
      </Section>
    </Section>
  )
}

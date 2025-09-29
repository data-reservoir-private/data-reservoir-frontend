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
import { ISeasonsResponse } from '@/model/response/seasons';
import { getStaticParams } from '@/utilities/static';
import SimpleImage from '@/components/common/SimpleImage';

interface DSMineralCropDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<ISeasonsResponse['ds-mineral-crop']>(API_ROUTE.SEASONS.DS_MINERAL_CROP);

const grabDetail = cache(async (id: string) => await grabData<ISeasonsResponse['ds-mineral-crop'] | null>(`${API_ROUTE.SEASONS.DS_MINERAL_CROP}/${id}`));

export async function generateMetadata(props: DSMineralCropDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Seasons DS Mineral Crop - ${post.data.name} - Data Reservoir`
  }
}

export default async function DSMineralCropDetail(props: DSMineralCropDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['seasons-ds-mineral-crop-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} pixelated unoptimized />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Location: data.location,
          Season: data.season,
          Price: data.price,
          "Seed Price": data.seedPrice,
          "Harvest Days": data.harvestDays,
          "Regrowth Days": data.regrowthDays,
        }} />
      </Section>
    </Section>
  )
}

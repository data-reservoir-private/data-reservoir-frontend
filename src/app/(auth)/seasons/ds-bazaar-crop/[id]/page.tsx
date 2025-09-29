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
import SimpleImage from '@/components/common/SimpleImage';

interface BazaarCropProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ISeasonsResponse['ds-bazaar-crop'] | null>(`${API_ROUTE.SEASONS.DS_BAZAAR_CROP}/${id}`));

export async function generateMetadata(props: BazaarCropProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Seasons DS Bazaar Crop - ${post.data.name} - Data Reservoir`
  }
}

export default async function BazaarCrop(props: BazaarCropProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['seasons-ds-bazaar-crop'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5 gap-5 max-md:flex-col items-center'>
        <Box className='w-50 h-50 relative items-center object-center flex gap-10 max-md:flex-col'>
          <SimpleImage src={data.image} alt={data.name} unoptimized pixelated/>
        </Box>
        <Box className='w-50 h-50 relative items-center object-center flex gap-10 max-md:flex-col'>
          <SimpleImage src={data.seedImage} alt={data.seedName} unoptimized pixelated/>
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Season: data.season,
          "Low Price": data.lowPrice,
          "Medium Price": data.mediumPrice,
          "High Price": data.highPrice,
          Harvest: data.harvestMinDays === data.harvestMaxDays ? data.harvestMinDays : `${data.harvestMinDays} - ${data.harvestMaxDays}`,
          Regrowth: !data.regrowthMinDays ? null : data.regrowthMinDays === data.regrowthMaxDays ? data.regrowthMinDays : `${data.regrowthMinDays} - ${data.regrowthMaxDays}`
        }} />
      </Section>

      <Section variant='h6' name='Seed'>
        <TableDetail data={{
          Name: data.seedName,
          Season: data.seedSeason,
          "Low Price": data.seedLowPrice,
          "Medium Price": data.seedMediumPrice,
          "High Price": data.seedHighPrice,
        }} />
      </Section>
    </Section>
  )
}

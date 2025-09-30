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
import SimpleImage from '@/components/common/SimpleImage';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { convertTheSimsRarity } from '@/utilities/general';

interface ThreePCMetalProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['three-pc-metal'] | null>(`${API_ROUTE.THE_SIMS.THREE_PC_METAL}/${id}`));

export async function generateMetadata(props: ThreePCMetalProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' };
  return {
    title: `The Sims Three PC Metal - ${post.data.name} - Data Reservoir`
  }
}

export default async function ThreePCMetal(props: ThreePCMetalProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-three-pc-metal-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5 gap-3'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <Image src={data.oreImage} alt={data.name} fill className='object-contain' />
        </Box>
        <Box className='w-50 h-50 relative items-center object-center'>
          <Image src={data.ingotImage} alt={data.name} fill className='object-contain' />
        </Box>
        {
          data.otherImage &&
          <Box className='w-50 h-50 relative items-center object-center'>
            <Image src={data.otherImage} alt={data.name} fill className='object-contain' />
          </Box>
        }
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Rarity: convertTheSimsRarity(data.rarity),
          Weight: `${data.minWeight} - ${data.maxWeight}`,
          "Ore Value": `${data.minOreValue} - ${data.maxOreValue}`,
          "Ingot Value": `${data.minIngotValue} - ${data.maxIngotValue}`,
        }} />
      </Section>

    </Section>
  )
}
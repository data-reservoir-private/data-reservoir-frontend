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
import { convertTheSimsRarity } from '@/utilities/general';
import { notFound } from 'next/navigation';

interface ThreePCHarvestableDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['three-pc-harvestable'] | null>(`${API_ROUTE.THE_SIMS.THREE_PC_HARVESTABLE}/${id}`));

export async function generateMetadata(props: ThreePCHarvestableDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `The Sims Three PC Harvestable - ${post.data.name} - Data Reservoir`
  }
}

export default async function ThreePCHarvestableDetail(props: ThreePCHarvestableDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-three-pc-harvestable-detail'], { label: data.name }]}
    >
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
          Rarity: convertTheSimsRarity(data.rarity),
          "Value": data.value,
          "Plant Type": data.plantType,
          "Max Produce": data.maxProduce,
          "Nectar Value": data.nectarValue,
          "Fertilizer Value": data.fertilizerValue,
          "Fertilizer Days": data.fertilizerDays,
        }} />
      </Section>
    </Section>
  )
}
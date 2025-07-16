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

interface FourPCHarvestableDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['four-pc-harvestable']>(`${API_ROUTE.THE_SIMS.FOUR_PC_HARVESTABLE}/${id}`));

export async function generateMetadata(props: FourPCHarvestableDetailProps) {
  const post = await grabDetail((await props.params).id);
  return {
    title: `The Sims Four PC Harvestable - ${post.data.name} - Data Reservoir`
  }
}

export default async function FourPCHarvestableDetail(props: FourPCHarvestableDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-four-pc-harvestable-detail'], { label: data.name }]}
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
          "Base Value": data.baseValue,
          "Perfect Value": data.perfectValue,
          "Growth Rate": data.growthRate,
          "Form": data.form,
          "Vertical Garden": data.verticalGarden,
          Description: data.description,
        }} />
      </Section>
    </Section>
  )
}
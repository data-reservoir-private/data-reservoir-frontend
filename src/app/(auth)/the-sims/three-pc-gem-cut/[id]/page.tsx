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
import DetailGrid from '@/components/common/detail-grid/DetailGrid';

interface ThreePCGemCutProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['three-pc-gem-cut-complete'] | null>(`${API_ROUTE.THE_SIMS.THREE_PC_GEM_CUT}/${id}`));

export async function generateMetadata(props: ThreePCGemCutProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' };
  return {
    title: `The Sims Three PC Gem Cut - ${post.data.name} - Data Reservoir`
  }
}

export default async function ThreePCGemCut(props: ThreePCGemCutProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-three-pc-gem-cut-detail'], { label: data.name }]}>
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
          Price: data.price,
          "Worth Change Percentage": `${data.worthChangePercentage}%`,
          "Break Even": data.breakEven,
          "Requirement": data.requirement
        }} />
      </Section>

      {/* Gems */}
      {data.gems.length > 0 && <DetailGrid name="Gems" data={data.gems.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        link: `/the-sims/three-pc-gem/${x.id}`
      }))} />}
    </Section>
  )
}
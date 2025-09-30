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
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Route } from 'next';

interface ThreePCPreserveDishDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['three-pc-preserve-dish'] | null>(`${API_ROUTE.THE_SIMS.THREE_PC_PRESERVE_DISH}/${id}`));

export async function generateMetadata(props: ThreePCPreserveDishDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' };
  return {
    title: `The Sims Three PC Preserve Dish - ${post.data.name} - Data Reservoir`
  }
}

export default async function ThreePCPreserveDishDetail(props: ThreePCPreserveDishDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

    return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-three-pc-preserve-dish-detail'], { label: data.name }]}>
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
          Name: data.name
        }} />
      </Section>

      {/* Harvestable */}
      <Section variant='h6' name='Harvestable'>
        <Paper className="flex overflow-hidden">
          <Link passHref href={`/the-sims/three-pc-harvestable/${data.harvestable.id}` as Route}>
            <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
              <SimpleImage quality={50} src={data.harvestable.image} alt={data.harvestable.name} />
            </Box>
          </Link>
          <Box className="grow flex">
            <Box className="grow p-3">
              <Typography className=''>{data.harvestable.name}</Typography>
            </Box>
          </Box>
        </Paper>
      </Section>

    </Section>
  )
}
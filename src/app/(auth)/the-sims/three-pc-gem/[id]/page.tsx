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

interface ThreePCGemDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['three-pc-gem'] | null>(`${API_ROUTE.THE_SIMS.THREE_PC_GEM}/${id}`));

export async function generateMetadata(props: ThreePCGemDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' };
  const name = `${post.data.rawGem.name} (${post.data.gemCut.name})`
  return {
    title: `The Sims Four PC Element - ${name} - Data Reservoir`
  }
}

export default async function ThreePCGemDetail(props: ThreePCGemDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  const name = `${data.rawGem.name} (${data.gemCut.name})`;

  return (
    <Section name={name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-three-pc-gem-detail'], { label: name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <Image src={data.image} alt={name} fill className='object-contain' />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: `${data.rawGem.name} (${data.gemCut.name})`,
        }} />
      </Section>

      {/* Gem Cut */}
      <Section variant='h6' name='Gem Cut'>
        <Paper className="flex overflow-hidden">
          <Link passHref href={`/the-sims/three-pc-gem-cut/${data.gemCut.id}` as Route}>
            <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
              <SimpleImage quality={50} src={data.gemCut.image} alt={data.gemCut.name} />
            </Box>
          </Link>
          <Box className="grow flex">
            <Box className="grow p-3">
              <Typography className=''>{data.gemCut.name}</Typography>
            </Box>
          </Box>
        </Paper>
      </Section>

      {/* Raw Gem */}
      <Section variant='h6' name='Raw Gem'>
        <Paper className="flex overflow-hidden">
          <Link passHref href={`/the-sims/three-pc-raw-gem/${data.rawGem.id}` as Route}>
            <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
              <SimpleImage quality={50} src={data.rawGem.image} alt={data.rawGem.name} />
            </Box>
          </Link>
          <Box className="grow flex">
            <Box className="grow p-3">
              <Typography className=''>{data.rawGem.name}</Typography>
            </Box>
          </Box>
        </Paper>
      </Section>

    </Section>
  )
}
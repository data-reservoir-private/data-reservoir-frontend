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
import SimpleImage from '@/components/common/SimpleImage';

interface NodeDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ICygnusResponse['node'] | null>(`${API_ROUTE.CYGNUS.NODE}/${id}`));

export async function generateMetadata(props: NodeDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Cygnus Node - ${post.data.name} - Data Reservoir`
  }
}

export default async function NodeDetail(props: NodeDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['cygnus-node-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5 gap-2'>
        {
          data.image.map((x, idx) => (
            <Box key={idx} className='w-50 h-50 relative items-center object-center'>
              <SimpleImage src={x} alt={data.name} unoptimized pixelated/>
            </Box>
          ))
        }
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Contains: data.contains,
          "Location in mines": data.locationMines,
          "Location in other places": data.locationOther,
        }} />
      </Section>
    </Section>
  )
}

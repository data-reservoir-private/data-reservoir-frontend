import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import React, { cache } from 'react'
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { ISeasonsResponse } from '@/model/response/seasons';
import SimpleImage from '@/components/common/SimpleImage';
import { Typography } from '@mui/material';

interface DSTwoTownsCropDetailProps {
  params: Promise<{ id: string }>
}

type IStage = {
  image: string,
} & (
    {
      status: 'grow',
      duration: number,
      duration_twice?: number
    } |
    {
      status: 'harvest'
    }
  );

const grabDetail = cache(async (id: string) => await grabData<ISeasonsResponse['ds-two-towns-crop-detail'] | null>(`${API_ROUTE.SEASONS.DS_TWO_TOWNS_CROP}/${id}`));

export async function generateMetadata(props: DSTwoTownsCropDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Seasons DS Two Towns Crop - ${post.data.name} - Data Reservoir`
  }
}

export default async function DSTwoTownsCropDetail(props: DSTwoTownsCropDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  const arrGrowth: IStage[] = [...data.growth.map(x => ({
    image: x.image,
    status: 'grow',
    duration: x.days,
    duration_twice: x.days_twice_watering
  } as IStage)), {
    image: data.harvestImage,
    status: 'harvest'
  }];

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['seasons-ds-two-towns-crop-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5 gap-5 max-md:flex-col items-center'>
        <Box className='w-50 h-50 relative items-center object-center flex gap-10 max-md:flex-col'>
          <SimpleImage src={data.image} alt={data.name} unoptimized pixelated />
        </Box>
        <Box className='w-50 h-50 relative items-center object-center flex gap-10 max-md:flex-col'>
          <SimpleImage src={data.seedImage} alt={data.seedSource} unoptimized pixelated />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Season: data.season,
          Regrow: data.regrow,
          "Low Price": data.lowPrice,
          "Medium Price": data.mediumPrice,
          "High Price": data.highPrice,
          "Seed Price": data.seedPrice,
          "Seed Source": data.seedSource,
          "Seed Notes": data.seedNotes ?? '-'
        }} />
      </Section>

      {/* Growth */}
      <Section variant='h6' name='Growth'>
        <Box className="flex gap-2 flex-wrap">
          {
            arrGrowth.map((x, idx) => (
              <Paper key={idx} className='flex gap-2 p-2 grow w-full items-center'>
                <Box className='w-24 h-auto min-h-24 p-2 relative'>
                  <SimpleImage src={x.image} alt="Growth" unoptimized pixelated />
                </Box>
                {
                  x.status === 'grow' && (
                    <Box className='flex flex-col gap-2'>
                      <Typography className='text-sm'>{x.duration} day(s)</Typography>
                      {x.duration_twice && <Typography className='text-sm'>{x.duration_twice} day(s) when watered twice</Typography>}
                    </Box>
                  )
                }
                {
                  x.status === 'harvest' && (
                    <Typography className='text-sm'>Ready to Harvest</Typography>
                  )
                }
              </Paper>
            ))
          }
        </Box>
      </Section>
    </Section>
  )
}

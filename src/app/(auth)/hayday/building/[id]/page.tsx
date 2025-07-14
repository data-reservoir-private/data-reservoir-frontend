import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { secondToTimespan } from '@/utilities/general';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import React, { cache } from 'react'
import Section from '@/components/common/paper/Section';

interface HaydayBuildingDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<IHaydayResponse['hayday-building-complete']>(`${API_ROUTE.HAY_DAY.BUILDING}/${id}`));

export async function generateMetadata(props: HaydayBuildingDetailProps) {
  const post = await grabDetail((await props.params).id);
  return {
    title: `Hayday Building - ${post.data.name} - Data Reservoir`
  }
}

export default async function HaydayBuildingDetail(props: HaydayBuildingDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);

  return (
    <Box className='flex flex-col gap-3'>
      {/* Name */}
      <Box className='flex flex-col gap-2'>
        <Typography className='font-bold' variant='h4'>{data.name}</Typography>
        <Paper className='w-full flex justify-center py-5'>
          <Box className='w-100 h-100 relative items-center object-center'>
            <Image src={data.image} alt={data.name} fill className='object-contain' />
          </Box>
        </Paper>
      </Box>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Price: data.price,
          Level: data.level,
          XP: data.xp,
          "Build Time": secondToTimespan(data.time, true),
          "Unlock Level": data.level,
        }} />
      </Section>

      {/* Products Made */}
      {data.productsMade && data.productsMade.length > 0 && <Grids name='Products Made' data={data.productsMade} />}
    </Box>
  )
}

function Grids({ name, data }: { name: string, data: IHaydayResponse['hayday-building-complete']['productsMade'] }) {
  return (
    <Section name={name} variant='h6' className="flex flex-col gap-2">
      {
        data.map(item => (
          <Paper className="flex overflow-hidden" key={item.id}>
            <Link passHref href={`/hayday/product/${item.id}`}>
              <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                <Image src={item.image} alt={item.name} fill className='object-contain p-1' />
              </Box>
            </Link>
            <Box className="grow flex">
              <Box className="grow p-3">
                <Typography className='text-lg font-bold'>{item.name}</Typography>
                <Typography className='text-sm'>Level {item.level}</Typography>
                <Box className="flex gap-2">
                  {
                    item.ingredients.map(ing => (
                      <Link key={ing.id} href={`/hayday/product/${ing.id}`} className='group'>
                        <Paper className="flex gap-3 items-center h-full rounded-full overflow-hidden group-hover:bg-gray-600/20">
                          <Box className="relative w-7 h-7">
                            <Image src={ing.image} alt={ing.name} fill className='object-contain p-1 bg-gray-500/20' />
                          </Box>
                          <Typography className='text-sm font-light'>{ing.name}</Typography>
                          <Typography className='text-sm font-bold pr-2'>{ing.quantity}</Typography>
                        </Paper>
                      </Link>
                    ))
                  }
                </Box>
              </Box>
            </Box>
          </Paper>
        ))
      }
    </Section>
  );
}

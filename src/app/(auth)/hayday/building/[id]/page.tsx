import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { secondToTimespan } from '@/utilities/general';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { cache } from 'react'
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import DetailGrid from '@/components/common/detail-grid/DetailGrid';

interface HaydayBuildingDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<IHaydayResponse['hayday-building-complete'] | null>(`${API_ROUTE.HAY_DAY.BUILDING}/${id}`));

export async function generateMetadata(props: HaydayBuildingDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Hayday Building - ${post.data.name} - Data Reservoir`
  }
}

export default async function HaydayBuildingDetail(props: HaydayBuildingDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['hayday-building-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-100 h-100 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} />
        </Box>
      </Paper>

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
      {data.productsMade && data.productsMade.length > 0 && <DetailGrid noGrid name="Products Made" data={data.productsMade.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        subtitle: `Level ${x.level}`,
        link: `/hayday/product/${x.id}`,
        content: (
          <Box className="flex gap-2 flex-wrap">
            {
              x.ingredients.map(ing => (
                <Link key={ing.id} href={`/hayday/product/${ing.id}`} className='group'>
                  <Paper className="flex gap-3 items-center h-full rounded-full overflow-hidden group-hover:bg-gray-600/20">
                    <Box className="relative w-7 h-7">
                      <SimpleImage sizes='28px' src={ing.image} alt={ing.name} className='bg-gray-500/20' />
                    </Box>
                    <Typography className='text-sm font-light'>{ing.name}</Typography>
                    <Typography className='text-sm font-bold pr-2'>{ing.quantity}</Typography>
                  </Paper>
                </Link>
              ))
            }
          </Box>
        )
      }))} />}
    </Section>
  )
}
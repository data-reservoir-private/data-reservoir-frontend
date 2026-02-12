import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { secondToTimespan } from '@/utilities/general';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import { cache } from 'react'
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import DetailGrid from '@/components/common/detail-grid/DetailGrid';

interface HaydayProductDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<IHaydayResponse['hayday-product-complete'] | null>(`${API_ROUTE.HAY_DAY.PRODUCT}/${id}`));

export async function generateMetadata(props: HaydayProductDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Hayday Product - ${post.data.name} - Data Reservoir`
  }
}

export default async function HaydayProductDetail(props: HaydayProductDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['hayday-product-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Category: data.category,
          Price: data.price,
          "Is Raw": data.isRaw,
          Time: data.time == 0 ? '-' : secondToTimespan(data.time, true),
          Level: data.level,
          XP: data.xp,
          "Effort*": data.effort,
          "Effort (ln)*": data.effortLn,
        }} />

      </Section>

      {/* Made In */}
      {data.building && (<DetailGrid name='Made In' noGrid data={[{
        id: data.building.id,
        image: data.building.image,
        title: data.building.name,
        link: `/hayday/building/${data.building.id}`,
      }]} />)}

      {/* Recipe */}
      {data.ingredients.length > 0 && <DetailGrid name='Ingredients' data={data.ingredients.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        link: `/hayday/product/${x.id}`,
        quantity: x.quantity,
      }))} />}

      {/* Used In */}
      {data.usedIn.length > 0 && <DetailGrid name='Used In' data={data.usedIn.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        link: `/hayday/product/${x.id}`,
      }))} />}
    </Section>
  )
}
import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { ICygnusResponse } from '@/model/response/cygnus';
import Typography from '@mui/material/Typography';
import SimpleImage from '@/components/common/SimpleImage';
import { cacheLife, cacheTag } from 'next/cache';

interface CropDetailProps {
  params: Promise<{ id: string }>
}

type IStage = {
  image: string,
} & (
  {
    status: 'grow',
    duration: number,
    duration_irrigated?: number
  } |
  {
    status: 'harvest'
  } |
  {
    status: 'regrow',
    duration: number
  }
)

const grabDetail = async (id: string) => {
  return await grabData<ICygnusResponse['crop-complete'] | null>(`${API_ROUTE.CYGNUS.CROP}/${id}`);
};

export async function generateMetadata(props: CropDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Cygnus Crop - ${post.data.name} - Data Reservoir`
  }
}

export default async function CropDetail(props: CropDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  // Growth
  const arrGrowth: IStage[] = [...data.stages.ongoing.map(x => ({ 
    image: x.image,
    status: 'grow',
    duration: x.duration,
    duration_irrigated: x.duration_irrigated
  } as IStage)), {
    image: data.stages.done.harvest,
    status: 'harvest'
    }];
  
  if (data.stages.done.regrowth && data.special?.regrowth) arrGrowth.push({
    status: 'regrow',
    duration: data.special!.regrowth,
    image: data.stages.done.regrowth
  })

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['cygnus-crop-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} unoptimized pixelated/>
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Description: data.description,
          Season: data.season.join(', '),
          Extra: data.special?.extra ?? undefined,
          Trellis: data.special?.trellis ?? undefined,
          Growth: data.stages.ongoing.reduce((acc, curr) => acc + curr.duration, 0)
        }} />
      </Section>

      {/* Growth */}
      <Section variant='h6' name='Growth'>
        <Box className="flex gap-2">
          {
            arrGrowth.map((x, idx) => (
              <Paper key={idx} className='flex flex-col gap-2 p-2 grow'>
                <Box className='w-full flex justify-center'>
                  <Box className='w-14 h-auto min-h-14 p-2 relative'>
                    <SimpleImage src={x.image} alt="Growth" unoptimized pixelated />
                  </Box>
                </Box>
                {
                  x.status === 'grow' && (
                    <Box>
                      <Typography className='text-sm'>Duration: {x.duration} day(s)</Typography>
                      {x.duration_irrigated && <Typography className='text-sm'>Duration: {x.duration_irrigated} day(s) when irrigated</Typography>}
                    </Box>
                  )
                }
                {
                  x.status === 'harvest' && (
                    <Box>
                      <Typography className='text-sm'>Ready to Harvest</Typography>
                    </Box>
                  )
                }
                {
                  x.status === 'regrow' && (
                    <Box>
                      <Typography className='text-sm'>Regrow: {x.duration} day(s)</Typography>
                    </Box>
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

import Paper from '@/components/common/paper/Paper';
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import TableDetail from '@/components/common/table-detail/TableDetail';
import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';
import { grabData } from '@/utilities/http';
import { Box, Typography } from '@mui/material';
import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

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
);

const apiCallSchema = z.string();

const apiCall = createServerFn({ method: 'GET' })
  .inputValidator(apiCallSchema)
  .handler(async ({ data }) => {
    const res = await grabData<ICygnusResponse['crop-complete']>(`${API_ROUTE.CYGNUS.CROP}/${data}`);
    if (res === null) throw notFound();
    return res;
  });

export const Route = createFileRoute('/(header)/_header/cygnus/crop/$id')({
  component: RouteComponent,
  loader: ({ params }) => apiCall({ data: params.id }),
})

function RouteComponent() {
  const { data } = Route.useLoaderData();

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
          <SimpleImage src={data.image} alt={data.name} pixelated/>
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
                    <SimpleImage src={x.image} alt="Growth" pixelated />
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

import Paper from '@/components/common/paper/Paper';
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import TableDetail from '@/components/common/table-detail/TableDetail';
import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IHaydayResponse } from '@/model/response/hayday';
import { secondToTimespan } from '@/utilities/general';
import { grabData } from '@/utilities/http';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

const apiCall = createServerFn({ method: 'GET' })
  .inputValidator(z.string())
  .handler(async ({ data }) => {
    const res = await grabData<IHaydayResponse['hayday-product-complete']>(`${API_ROUTE.HAY_DAY.PRODUCT}/${data}`);
    if (res === null) throw notFound();
    return res;
  });

export const Route = createFileRoute('/(header)/_header/hayday/product/$id')({
  component: RouteComponent,
  loader: ({ params }) => apiCall({ data: params.id })
})

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['hayday-product-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <img src={data.image} alt={data.name} />
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
          Effort: data.effort,
          "Effort (ln)": data.effortLn,
        }} />

      </Section>

      {/* Made In */}
      {
        data.building && (
          <Section name='Made In' variant='h6'>
            <Paper className="flex overflow-hidden">
              <Link href={`/hayday/building/${data.building.id}`}>
                <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                  <SimpleImage src={data.building.image} alt={data.building.name} />
                </Box>
              </Link>
              <Box className="grow flex">
                <Box className="grow p-3">
                  <Typography className=''>{data.building.name}</Typography>
                </Box>
              </Box>
            </Paper>
          </Section>
        )
      }

      {/* Recipe */}
      {data.ingredients.length > 0 && <Grids name='Ingredients' data={data.ingredients} />}

      {/* Used In */}
      {data.usedIn.length > 0 && <Grids name='Used In' data={data.usedIn} />}
    </Section>
  )
}

function Grids({ name, data }: { name: string, data: { name: string, quantity: number, image: string, id: string }[] }) {
  return (
    <Section name={name} variant='h6' className='flex flex-col gap-2'>
      <Grid container columns={{ md: 3, xs: 1 }} spacing={'.5rem'}>
        {
          data.map(ing => (
            <Grid size={1} key={ing.id}>
              <Paper className="flex overflow-hidden">
                <Link href={`/hayday/product/${ing.id}`}>
                  <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                    <SimpleImage quality={50} src={ing.image} alt={ing.name}/>
                  </Box>
                </Link>
                <Box className="grow flex">
                  <Box className="grow p-3">
                    <Typography className=''>{ing.name}</Typography>
                  </Box>
                  <Box className="p-3 flex items-center text-3xl font-bold bg-secondary-dark">{ing.quantity}</Box>
                </Box>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  );
}
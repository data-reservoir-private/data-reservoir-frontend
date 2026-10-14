import { getSearchParam, grabData } from "@/utilities/http";
import { HaydayOrderFormSchema } from "../form";
import { IHaydayResponse } from "@/model/response/hayday";
import { API_ROUTE } from "@/constant/api-route";
import Paper from "@/components/common/paper/Paper";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import SimpleImage from "@/components/common/SimpleImage";
import Link from "next/link";
import { HAYDAY_COMPOSITION_MODE } from "@/constant/enums";
import { cacheLife, cacheTag } from "next/cache";

export default async function CompositionPage() { 
  const sp = await getSearchParam<HaydayOrderFormSchema>();

  const { data } = await getData(sp);

  if (!data || data.length === 0) {
    return (
      <Paper className='w-full flex justify-center items-center p-2'>
        <Typography>No data</Typography>
      </Paper>
    );
  }

  return (
    <Box className='flex flex-col gap-3'>
      <Grid container gap='.25rem' columns={10} justifyContent={'space-evenly'}>
        {
          data.map(product => (
            <Link passHref href={`/hayday/product/${product.id}`} key={product.id} title={product.name} prefetch={false}>
              <ButtonBase type='button'>
                <Paper className='flex flex-col min-h-30'>
                  <Box className='w-15 h-15 relative bg-background-default p-1'><SimpleImage src={product.image} alt={product.name} /></Box>
                  <Box className='flex flex-col items-center justify-center gap-0.5 h-full grow'>
                    <Typography variant='body1' className='font-bold'>{product.quantity}</Typography>
                    {
                      product.additionalQuantity > 0 && (
                        <Typography variant='subtitle2' className='text-xs'>+{product.additionalQuantity}</Typography>
                      )
                    }
                  </Box>
                </Paper>
              </ButtonBase>
            </Link>
          ))
        }
      </Grid>
    </Box>
  );
}

async function getData(params: HaydayOrderFormSchema) {
  'use cache';
  cacheLife('hours');
  cacheTag('hayday');
  return grabData<IHaydayResponse['hayday-order']['composition'][]>(API_ROUTE.HAY_DAY.ORDER.COMPOSITION, {
    ...params,
    mode: HAYDAY_COMPOSITION_MODE.ADDITIONAL
  });
}
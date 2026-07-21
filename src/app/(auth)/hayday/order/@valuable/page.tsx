import { API_ROUTE } from "@/constant/api-route";
import { IHaydayResponse } from "@/model/response/hayday";
import { getSearchParam, grabData } from "@/utilities/http";
import { HaydayOrderFormSchema } from "../form";
import Grid from "@mui/material/Grid";
import Paper from "@/components/common/paper/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Link from "next/link";
import SimpleImage from "@/components/common/SimpleImage";
import { BsPlusCircleFill, BsStarFill } from "react-icons/bs";
import { GiTwoCoins } from "react-icons/gi";
import dayjs from "dayjs";

export default async function ValuableOrder() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  const { data } = await grabData<
    IHaydayResponse["hayday-order"]["valuable"][]
  >(API_ROUTE.HAY_DAY.ORDER.VALUABLE, sp);

  if (!data || data.length === 0) {
    return (
      <Paper className="w-full flex justify-center items-center p-2">
        <Typography>No data</Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing="1rem" columns={{ xs: 1, md: 2, lg: 3 }}>
      {data.map((v, idx) => (
        <Grid size={1} key={idx}>
          <Paper className="p-2 flex flex-col gap-2">
            <Box className="flex justify-between items-center">
              <Typography variant="body2" className="font-bold">
                {v.clientName}
              </Typography>
              <Typography variant="subtitle2" className="text-xs">
                {dayjs(v.dateAccepted).format("YYYY-MM-DD HH:mm:ss")}
              </Typography>
            </Box>
            <Box className="flex gap-3 justify-between items-center">
              <Box className="flex gap-1 items-center font-bold">
                <Typography variant="subtitle2" className="text-md font-bold">
                  {v.revenueEvent} ({v.revenue})
                </Typography>
              </Box>
              <Box className="flex gap-1 items-center">
                <GiTwoCoins />
                <Typography variant="subtitle2" className="text-xs">
                  {v.coinEvent} ({v.coin})
                </Typography>
              </Box>
              <Box className="flex gap-1 items-center">
                <BsStarFill />
                <Typography variant="subtitle2" className="text-xs">
                  {v.xpEvent} ({v.xp})
                </Typography>
              </Box>
            </Box>
            <Box className="flex justify-between">
              {v.products.map((pr) => (
                <Link
                  passHref
                  href={`/hayday/product/${pr.id}`}
                  key={pr.id}
                  title={pr.name}
                >
                  <ButtonBase type="button" className="w-full">
                    <Paper className="w-full flex flex-col gap-1 px-1 items-center hover:bg-background-default/70 transition-all">
                      <Box className="w-12 h-12 relative">
                        <SimpleImage src={pr.image} alt={pr.name} />
                      </Box>
                      <Typography className='text-lg font-bold'>{pr.quantity}</Typography>
                    </Paper>
                  </ButtonBase>
                </Link>
              ))}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

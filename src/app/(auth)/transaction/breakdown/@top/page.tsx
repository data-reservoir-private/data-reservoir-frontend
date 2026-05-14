import { getSearchParam, grabData } from "@/utilities/http";
import { TransactionBreakdownFormSchema } from "../form";
import { ITransactionBreakdownResponse } from "@/model/response/transaction";
import { API_ROUTE } from "@/constant/api-route";
import Section from "@/components/common/paper/Section";
import Box from "@mui/material/Box";
import TopTable from "./table";
import Typography from "@mui/material/Typography";
import Paper from "@/components/common/paper/Paper";

export default async function TransactionTop() {
  const sp = await getSearchParam<TransactionBreakdownFormSchema>();
  const { data: topData } = await grabData<
    ITransactionBreakdownResponse["top"][]
  >(API_ROUTE.TRANSACTION.BREAKDOWN.TOP, {
    year: sp.year,
    month: sp.month,
  });

  return (
    <Section name="Top Expenses" variant="h6">
      {/* Two pie chars about income-expense and expense by category */}
      <Box className="w-full flex">
        {topData.length > 0 ? (
          <TopTable data={topData} />
        ) : (
          <Paper className="w-full min-h-32">
            <Box className="w-full h-full flex flex-col items-center justify-center">
              <Typography>No data available for the selected period.</Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </Section>
  );
}

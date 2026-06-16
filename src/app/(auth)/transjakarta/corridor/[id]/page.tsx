import Paper from "@/components/common/paper/Paper";
import Section from "@/components/common/paper/Section";
import TableDetail from "@/components/common/table-detail/TableDetail";
import TransjakartaCodeIcon from "@/components/icon/transjakarta-code";
import { API_ROUTE } from "@/constant/api-route";
import { BREADCRUMBS } from "@/constant/breadcrumb";
import { ITransjakartaResponse } from "@/model/response/transjakarta";
import { grabData } from "@/utilities/http";
import Box from "@mui/material/Box";
import { notFound } from "next/navigation";
import { cache } from "react";

interface TransjakartaCorridorPageProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITransjakartaResponse['corridor'][] | null>(API_ROUTE.TRANSJAKARTA.CORRIDOR.ID(id)));

export async function generateMetadata(props: TransjakartaCorridorPageProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data || post.data.length === 0) return { title: 'Not Found - Data Reservoir' };
  return {
    title: `Transjakarta Corridor - ${post.data[0].code} - Data Reservoir`
  };
}

export default async function TransjakartaCorridorDetail(props: TransjakartaCorridorPageProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data || data.length === 0) return notFound();

  const latestData = data[0];

  const title = (
    <Box className='flex items-center gap-3'>
      <TransjakartaCodeIcon code={latestData.code} color={latestData.color} size='sm' />
      <span className='text-2xl font-bold font-[PT_Sans]'>{latestData.name}</span>
    </Box>
  )

  return (
    <Section name={title} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['transjakarta-corridor-detail'], { label: latestData.code }]}>
      {
        data.map((corridor, idx) => (
          <Paper key={idx} className='flex gap-4 p-4 max-md:flex-col'>
            <img src={corridor.image} alt={corridor.name} className='h-220 w-auto shrink-0 object-contain' />
            <Box className='flex-1'>
              <TableDetail className='py-0!' data={{
                'Code': corridor.code,
                'Name': corridor.name,
                'Category': corridor.category,
                'Color': corridor.color,
                'Effective Date': corridor.effectiveDate,
              }} />
            </Box>
          </Paper>
        ))
      }
    </Section>
  )
}
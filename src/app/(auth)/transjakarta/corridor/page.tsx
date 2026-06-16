import Section from "@/components/common/paper/Section";
import { API_ROUTE } from "@/constant/api-route";
import { BREADCRUMBS } from "@/constant/breadcrumb";
import { ITransjakartaResponse } from "@/model/response/transjakarta";
import { grabData } from "@/utilities/http";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import { MdExpandMore } from 'react-icons/md';
import clsx from "classnames";
import TransjakartaCodeIcon from "@/components/icon/transjakarta-code";

export const metadata: Metadata = {
  title: 'Transjakarta Corridor - Data Reservoir'
};

const categoryGroupOrdering = ['BRT', 'Angkutan Pengumpan', 'Mikrotrans', 'Royaltrans', 'Rumah Susun', 'Layanan AMARI', 'Khusus', 'Transjabodetabek', 'Wisata', 'Tidak Beroperasi'];

export default async function BazaarCrop() {
  const { data } = await grabData<ITransjakartaResponse['corridor'][]>(API_ROUTE.TRANSJAKARTA.CORRIDOR.BASE, {
    pageSize: 0,
  });

  // Group by categories
  const groupedData = data.reduce((acc, corridor) => {
    if (!acc[corridor.category]) {
      acc[corridor.category] = [];
    }
    acc[corridor.category].push(corridor);
    return acc;
  }, {} as Record<string, ITransjakartaResponse['corridor'][]>);
  const groups = Object.keys(groupedData);

  // Sort by pure number, then localeCompare
  function compareCategory(a: string, b: string) {
    const numA = +a;
    const numB = +b;
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    if (!isNaN(numA)) return -1;
    if (!isNaN(numB)) return 1;

    return a.localeCompare(b);
  }

  return (
    <Section name='Transjakarta Corridor' variant='h4' breadcrumbs={BREADCRUMBS['transjakarta-corridor']}>
      <Box>
        {
        categoryGroupOrdering.filter(category => groups.includes(category)).map(category => (
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls={`${category}-panel1-content`}
              id={`${category}-panel1-header`}
            >
              <Typography component="span" className='font-bold text-xl'>{category}</Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-wrap gap-4">
              {
                groupedData[category].sort((a, b) => compareCategory(a.code, b.code)).map(corridor => (
                  <Link passHref key={corridor.code} href={`/transjakarta/corridor/${corridor.code}`}>
                    <TransjakartaCodeIcon code={corridor.code} color={corridor.color}/>
                  </Link>
                ))
              }
            </AccordionDetails>
          </Accordion>
        ))
      }
      </Box>

    </Section>
  );
}

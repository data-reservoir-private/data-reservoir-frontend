import Section from '@/components/common/paper/Section';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import { DATASETS_AVAILABLE } from '@/constant/data';
import { grabData } from '@/utilities/http';
import { IDashboardResponse } from '@/model/response/dashboard';
import { API_ROUTE } from '@/constant/api-route';
import ExportMasterDatasetClient from './client';

export const metadata: Metadata = {
  title: 'Export Data - Data Reservoir'
};

interface Dataset {
  name: string,
  total: number,
  owner: string
}

export default async function ExportPage() {

  const { data } = await grabData<IDashboardResponse[]>(`${API_ROUTE.DASHBOARD}`);
  const datasets = data.reduce((acc, curr) =>
    [...acc, ...curr.datasets.map(x => ({ name: `${curr.category} ${x.name}`, total: x.total, owner: curr.owner }))]
    , [] as Dataset[]);

  return (
    <Section name='Export Data' variant='h4'>
      <Typography textAlign='justify'>Please note that your data might be incomplete and some of data provided by this export utility might be cached, resulting in delayed updates.</Typography>
      <Typography textAlign='justify'>Exported data might be simpler than your detail menu (might just be its ID, image, and name). If you need more data (relations for example), please contact me personally and I will query it all for you.</Typography>
      <Typography textAlign='justify'>Not every data that you can view can be exported due to complexity of those data. I will try my best to support it all, but for now, you just have to wait :(</Typography>
      <Typography textAlign='justify'>The structure of the data is similar to the one you usually found inside detail endpoint (endpoint that ends with GUID like <code>00000000-0000-0000-0000-000000000000</code>).</Typography>

      <ExportMasterDatasetClient dataset={DATASETS_AVAILABLE} apiDataset={datasets} />
{/* 
      <Section name='Transactional Datasets' variant='h6'>


      </Section> */}

    </Section>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Transjakarta Corridor - Data Reservoir'
};

export default async function BazaarCrop() {
  const { data } = await grabData<ISeasonsResponse['ds-bazaar-crop'][]>(API_ROUTE.SEASONS.DS_BAZAAR_CROP.BASE, {
    pageSize: 0,
  });

  return (
    <Section name='Seasons DS Bazaar Crop' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-bazaar-crop']}>
      <SimpleGrid data={data} link='/seasons/ds-bazaar-crop' unoptimizedImage pixelated />
    </Section>
  );
}

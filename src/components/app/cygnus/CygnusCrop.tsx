import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { API_ROUTE } from '@/constant/api-route';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import { CygnusCropResponse } from '@/model/response/cygnus';
import Image from 'next/image';
import GridDetailImageLink from '@/components/common/basic-grid/GridDetailImageLink';

export default function CygnusCrop() {
  const { isLoading, data } = useQuery({
    queryKey: ['cygnus-crop'],
    queryFn: async () => {
      const j = await request<CygnusCropResponse[], {}>({
        method: "GET",
        url: API_ROUTE.CYGNUS.CROP,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: CygnusCropResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} className='rendering-pixelated' unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Image: (<GridDetailImageLink href={d.image}>Link</GridDetailImageLink>),
        Description: d.description,
        Stages: (() => {
          const stage = d.stages.ongoing.map(x => ({ image: x.image, text: !x.duration_irrigated ? `${x.duration} days` : `${x.duration} days (💧${x.duration_irrigated} days)` }));
          stage.push({ image: d.stages.done.harvest, text: "Harvest" });
          if (d.stages.done.regrowth && d.special?.regrowth) stage.push({ image: d.stages.done.harvest, text: `Regrowth (${d.special.regrowth} days)` });

          return (
            <ul className='gap-2 flex flex-col'>
              {
                stage.map((s, idx) => (
                <li key={idx}>
                  <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                    <div className='relative min-h-6 w-6 p-1 bg-slate-400/60 rounded flex items-center'>
                      <Image src={s.image} alt={idx.toString()} fill objectFit='contain' />
                    </div>
                    <span>{s.text}</span>
                  </div>
                </li>
                ))
              }
            </ul>
          );
        })(),
        Seeds: (() => {
          return (
            <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
              <div className='relative min-h-6 w-6 p-2 bg-slate-400/60 rounded flex items-center'>
                <Image src={d.seeds.image} alt={d.seeds.name} fill objectFit='contain' />
              </div>
              <span>{d.seeds.name}</span>
            </div>
          );
        })()
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridImageUnoptimized gridImageClasses='rendering-pixelated' />;
}

'use client'

import HaydayIconHelper from '@/components/app/hayday/HaydayIconHelper';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import SimpleCheckbox from '@/components/common/form/SimpleCheckbox';
import Loading from '@/components/common/loading/Loading';
import { API_ROUTE } from '@/constant/api-route';
import { HayDayProductResponse } from '@/model/response/hayday';
import { secondToTimespan } from '@/utilities/general';
import { request } from '@/utilities/http';
import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BiX } from 'react-icons/bi';

export default function DetailModal() {
  const r = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['hayday-product-detail', id],
    queryFn: async () => {
      const j = await request<HayDayProductResponse, {}>({
        method: "GET",
        url: API_ROUTE.HAY_DAY.PRODUCT + `/${id}`,
      });
      return (j?.data ?? {});
    }
  });

  return (
    <Dialog open onClose={() => r.back()} className="relative z-50 inset-0 flex w-screen bg-black/30 p-4">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center overflow-y-auto justify-center">
        <div className="flex  justify-center items-start h-full">
          {/* The actual dialog panel  */}
          <DialogPanel className="max-w-screen space-y-4 bg-blackish-200 text-white p-6 rounded min-w-[500px] max-md:min-w-full">
            {
              (isLoading || !data) ? <Loading /> : <>
                <DialogTitle className="font-bold flex justify-between items-center">
                  <div>Product Detail</div>
                  <CloseButton className='text-3xl'>
                    <BiX />
                  </CloseButton>
                  {/* <div onClick={() => r.back()}><BiX/></div> */}
                </DialogTitle>
                <hr className='border-white/30' />
                <div className='w-full flex flex-col gap-3'>
                  <BasicGridDetailImage src={data.image} alt={data.name} className='' unoptimized />
                  <div className='text-white text-lg font-bold'>{data.name}</div>
                  <GridDetail data={{
                    ID: data.id,
                    Name: data.name,
                    Category: data.category,
                    Price: <div className='flex gap-1'>{data.price} <HaydayIconHelper type='coins' /> </div>,
                    Time: <div className='flex gap-1'>{secondToTimespan(data.time)} <HaydayIconHelper type='time' /> </div>,
                    XP: <div className='flex gap-1'>{data.xp} <HaydayIconHelper type='xp' /> </div>,
                    Level: data.level,
                    "Is Raw": (
                      <SimpleCheckbox checked={data.is_raw} disabled />
                    ),
                    "Made In": data.producer ? (
                      <>
                        <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                          <div className='relative min-h-6 w-6'>
                            <Image src={data.producer.building_image} alt={data.producer.building_name} fill />
                          </div>
                          <span>{data.producer.building_name}</span>
                        </div>
                      </>
                    ) : "-",
                    Recipe: data.ingredients.length > 0 ? (
                      <ul className='gap-2 flex flex-col'>
                        {
                          data.ingredients.map(i => (
                            <li key={i.ingredient_name}>
                              <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                                <div className='relative min-h-6 w-6'>
                                  <Image src={i.ingredient_image} alt={i.ingredient_name} fill />
                                </div>
                                <span>{i.ingredient_name} ({i.quantity})</span>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                    ) : "-",
                    "Used By": data.usage.length > 0 ? (
                      <ul className='gap-2 flex flex-col'>
                        {
                          data.usage.map(i => (
                            <li key={i.product_name}>
                              <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                                <div className='relative min-h-6 w-6'>
                                  <Image src={i.product_image} alt={i.product_name} fill />
                                </div>
                                <span>{i.product_name} ({i.quantity})</span>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                    ) : "-"
                  }} />
                </div>
              </>
            }
          </DialogPanel>

        </div>
      </div>
    </Dialog>
  )
}

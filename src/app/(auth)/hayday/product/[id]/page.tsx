import HaydayIconHelper from '@/components/app/hayday/HaydayIconHelper';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage'
import GridDetail from '@/components/common/basic-grid/GridDetail'
import SimpleCheckbox from '@/components/common/form/SimpleCheckbox';
import { GetHaydayProductByID } from '@/service/hayday';
import { secondToTimespan } from '@/utilities/general';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface HaydayProductIDPageProps {
  params: Promise<{ id: string }>
}

export default async function HaydayProductIDPage({ params }: HaydayProductIDPageProps) {
  const { id } = await params;
  const data = await GetHaydayProductByID(id);

  return (
    <div className='w-full flex flex-col gap-3 text-white'>
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
      <Link passHref href={'/hayday/product'} className='w-full'>
        <button type='button' className='w-full'>Back</button>
      </Link>
    </div>
  )
}

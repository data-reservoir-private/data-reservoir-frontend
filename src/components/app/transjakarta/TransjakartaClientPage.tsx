'use client';

import React from 'react';
import TransjakartaCorridorNumbering from './TransjakartaCorridorNumbering';
import { ptSansBold } from '@/constant/font';
import TransjakartaCode from './TransjakartaCode';
import classNames from 'classnames';
import TransjakartaCorridor from './TransjakartaCorridor';

const mainCorridor = [
  {
    "code": "14",
    "color": "#FF7F00"
  },
  {
    "code": "13",
    "color": "#5C369D"
  },
  {
    "code": "12",
    "color": "#63BA6B"
  },
  {
    "code": "11",
    "color": "#304FA2"
  },
  {
    "code": "10",
    "color": "#90191D"
  },
  {
    "code": "9",
    "color": "#3F9594"
  },
  {
    "code": "8",
    "color": "#CB2990"
  },
  {
    "code": "7",
    "color": "#E2285A"
  },
  {
    "code": "6",
    "color": "#2CA546"
  },
  {
    "code": "5",
    "color": "#BC5729"
  },
  {
    "code": "4",
    "color": "#562B63"
  },
  {
    "code": "3",
    "color": "#FDC71D"
  },
  {
    "code": "2",
    "color": "#274698"
  },
  {
    "code": "1",
    "color": "#D22129"
  }
];

export default function TransjakartaClientPage() {
  return (
    <div className='flex flex-col h-full gap-4 overflow-hidden p-2'>

      {/* TJ Header */}
      <div className='grid grid-cols-[1.5fr_6fr_8fr] w-full h-32'>
        <div className='bg-[#06367C]'></div>
        <div className='flex items-center gap-5 bg-[#242732] px-6'>
          <TransjakartaCorridorNumbering code='7' order={10} color='#06367C' />
          <span className={classNames(ptSansBold.className, 'text-white text-xl')}>Transjakarta</span>
        </div>
        <div className='flex flex-wrap grid-rows-2 gap-2.5 p-4 bg-bluish-200 justify-center'>
          {
            mainCorridor.sort((a, b) => parseInt(a.code) - parseInt(b.code)).map(corridor => <TransjakartaCode color={corridor.color} code={corridor.code} key={corridor.code} className='hover:brightness-100'/>)
          }
        </div>
      </div>

      <div className='overflow-y-auto h-[calc(100%-100px)] flex-1'>
        <TransjakartaCorridor/>
      </div>

    </div>
  );
}

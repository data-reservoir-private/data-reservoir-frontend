import { ptSansBold } from '@/constant/font';
import classNames from 'classnames';
import React from 'react'

export type TransjakartaScheduleIconProps = {
  icon: 'weekday' | 'weekend' | 'peakday' | 'peakevening' | 'night' | 'day';
}

export default function TransjakartaScheduleIcon(props: TransjakartaScheduleIconProps) {
  return (
    <div className={classNames('w-16 h-16 border-[8px] text-[28px] font-extrabold rounded-full text-center flex justify-center items-center', ptSansBold.className, {
      'bg-white text-[#019647] border-[#019647]': props.icon === 'weekday',
      'bg-white text-[#BC262E] border-[#BC262E]': props.icon === 'weekend',
      'bg-[#F29215] text-white border-[#FFDE20]': props.icon === 'day',
      'bg-[#1A74B5] text-white border-[#2D388D]': props.icon === 'night',
      'bg-white text-black border-[#F09A10]': props.icon === 'peakday',
      'bg-white text-black border-[#266FB7]': props.icon === 'peakevening',
    })}>
      <span>
        {
          props.icon === 'weekday' ? 'WD' :
            props.icon === 'weekend' ? 'WE' :
              props.icon === 'peakday' ? 'AM' :
                props.icon === 'peakevening' ? 'PM' :
                  props.icon === 'day' ? 'D' : 'N'
        }
      </span>
    </div>
  )
}

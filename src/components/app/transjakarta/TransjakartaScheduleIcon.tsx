import { ptSansBold } from '@/constant/font';
import classNames from 'classnames';
import React from 'react';

export type TransjakartaScheduleIconProps = {
  icon: 'weekday' | 'weekend' | 'peakday' | 'peakevening' | 'night' | 'day';
}

export default function TransjakartaScheduleIcon(props: TransjakartaScheduleIconProps) {

  const title = props.icon === 'weekday' ? 'Operates on weekday (Mon - Fri)' :
    props.icon === 'weekend' ? 'Operates on weekend (Sat and Sun)' :
      props.icon === 'peakday' ? 'Operates on peak day only' :
        props.icon === 'peakevening' ? 'Operates on peak evening only' :
          props.icon === 'day' ? 'Operates on day' : 'Operates on night';

  return (
    <div title={title} className={classNames('w-8 h-8 border-[4px] text-[12px] font-extrabold rounded-full text-center flex justify-center items-center', ptSansBold.className, {
      'bg-white text-[#019647] border-[#019647]': props.icon === 'weekend',
      'bg-white text-[#BC262E] border-[#BC262E]': props.icon === 'weekday',
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
  );
}

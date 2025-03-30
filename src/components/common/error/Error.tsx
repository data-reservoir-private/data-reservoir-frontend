import classNames from 'classnames';
import React from 'react';

export interface ErrorProps {
  message?: string,
  className?: string
}

export default function Error(props: ErrorProps) {
  return (
    <div className={classNames('flex flex-col h-full justify-center items-center p-3 gap-2', props.className)}>
      <div className='text-5xl'>😭</div>
      <p className='text-white'>{props.message ?? "Ouch!"}</p>
    </div>
  );
}

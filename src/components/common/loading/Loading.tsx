import classNames from 'classnames';
import React from 'react';

export interface LoadingProps {
  message?: string,
  className?: string
}

export default function Loading(props: LoadingProps) {
  return (
    <div className={classNames('flex flex-col h-full justify-center items-center p-3 gap-2', props.className)}>
      <div>
        Loading...
      </div>
      <p className='text-white'>{props.message ?? "Loading..."}</p>
    </div>
  );
}

import classNames from 'classnames';
import React from 'react';
import { Spinner } from "flowbite-react";

export interface LoadingProps {
  message?: string,
  className?: string
}

export default function Loading(props: LoadingProps) {
  return (
    <div className={classNames('flex flex-col h-full justify-center items-center', props.className)}>
      <div>
        <Spinner className=''/>
      </div>
      <p className='text-white'>{props.message ?? "Loading..."}</p>
    </div>
  );
}

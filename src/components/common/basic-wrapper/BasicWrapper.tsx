import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import Error from '../error/Error';
import Loading from '../loading/Loading';

interface BasicWrapperProps<T>{
  queryResult: UseQueryResult<T, Error>
  children: React.ReactNode
}

export default function BasicWrapper<T>(props: BasicWrapperProps<T>) {
  if (props.queryResult.isLoading) return (<Loading message={
    props.queryResult.failureCount < 3 ? 'Loading...' : 'One last time...'
  } />);
  else if (props.queryResult.isError || !props.queryResult.data) return (<Error message={props.queryResult.error?.message} />);
  else return props.children;
}

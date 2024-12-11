import CygnusClientPage from '@/components/app/cygnus/CygnusClientPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cygnus - Birdeye View'
};

export default function FarmFrenzyPage() {
  return (<CygnusClientPage/>);
}

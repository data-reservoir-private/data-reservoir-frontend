import FarmFrenzyClientPage from '@/components/app/farm-frenzy/FarmFrenzyClientPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Farm Frenzy - Birdeye View'
};

export default function FarmFrenzyPage() {
  return (<FarmFrenzyClientPage/>);
}

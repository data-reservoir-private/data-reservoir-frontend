import TransjakartaClientPage from '@/components/app/transjakarta/TransjakartaClientPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Transjakarta - Birdeye View'
};

export default function TransjakartaPage() {
  return (<TransjakartaClientPage />);
}

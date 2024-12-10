import PizzaFrenzyClientPage from '@/components/app/pizza-frenzy/PizzaFrenzyClient';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Pizza Frenzy - Birdeye View'
};

export default function PizzaFrenzyPage() {
  return (<PizzaFrenzyClientPage/>);
}

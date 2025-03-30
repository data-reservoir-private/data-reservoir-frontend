import TransactionMonthly from '@/components/app/transaction/TransactionMonthly';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Transaction - Birdeye View'
};

export default function TransactionPage() {
  return (<TransactionMonthly/>);
}

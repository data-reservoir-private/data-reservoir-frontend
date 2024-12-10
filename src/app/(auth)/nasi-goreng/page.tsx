import NasiGorengClientPage from "@/components/app/nasi-goreng/NasiGorengClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Nasi Goreng - Birdeye View'
};

export default function TheSimsPage() {
  return (<NasiGorengClientPage/>);
}
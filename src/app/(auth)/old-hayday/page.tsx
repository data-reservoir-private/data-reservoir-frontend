import HaydayClientPage from "@/components/app/hayday/HaydayClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Hayday - Birdeye View'
};

export default function HaydayPage() {
  return (<HaydayClientPage/>);
}
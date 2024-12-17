import TheSimsClientPage from "@/components/app/the-sims/TheSimsClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'The Sims - Birdeye View'
};

export default function TheSimsPage() {
  return (<TheSimsClientPage/>);
}
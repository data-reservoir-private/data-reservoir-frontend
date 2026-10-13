'use server';

import { updateTag } from "next/cache";

export async function invalidateHayday() {
  console.log("Done");
  updateTag('hayday');
}

export async function invalidateTransaction() {
  console.log("Done");
  updateTag('transaction');
}
import { newResponse } from "@/utilities/api";

export async function GET(_: Request, props: { params: Promise<{ code: string }> }) {
  return newResponse({});
}
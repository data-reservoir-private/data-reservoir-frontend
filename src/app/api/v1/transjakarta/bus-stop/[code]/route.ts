import { NextRequest } from 'next/server';
import { okResponse } from '@/utilities/api';

export async function GET(_: NextRequest, props: { params: Promise<{ code: string }> }) {
  const { code } = await props.params;
  const intCode = parseInt(code);

  return okResponse({});
}
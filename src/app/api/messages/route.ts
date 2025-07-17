import { NextResponse } from 'next/server';
import { sendMessage } from '@/lib/grpc-client';
import { SendMessagePayload } from '@/lib/types';

export async function POST(request: Request) {
  const body: SendMessagePayload = await request.json();

  try {
    const response = await sendMessage(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

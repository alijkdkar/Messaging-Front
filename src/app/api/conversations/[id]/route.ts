import { NextResponse } from 'next/server';
import { getConversation } from '@/lib/grpc-client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  try {
    const conversation = await getConversation(id);
    return NextResponse.json(conversation);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch conversation' }, { status: 500 });
  }
}

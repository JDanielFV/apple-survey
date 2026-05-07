import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ responses: data });
}

export async function POST(request: Request) {
  const responseData = await request.json();
  
  // Extraemos el ID si existe para hacer un upsert
  const { id, ...payload } = responseData;

  const { data, error } = await supabase
    .from('responses')
    .upsert({
      id: id || undefined,
      ...payload,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

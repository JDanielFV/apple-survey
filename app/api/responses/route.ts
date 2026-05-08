import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("[API Responses GET] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ responses: data });
  } catch (e) {
    console.error("[API Responses GET] Unexpected error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const responseData = await request.json();
    const { id, ...payload } = responseData;

    console.log(`[API Responses POST] Upserting response. ID: ${id || 'NEW'}`);

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
      console.error("[API Responses POST] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[API Responses POST] Success");
    return NextResponse.json(data);
  } catch (e) {
    console.error("[API Responses POST] Unexpected error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

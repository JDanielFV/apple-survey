import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("[API Surveys GET] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ surveys: data });
  } catch (e) {
    console.error("[API Surveys GET] Unexpected error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Missing name or slug" }, { status: 400 });
    }

    console.log(`[API Surveys POST] Creating survey: ${name} (${slug})`);

    const { data, error } = await supabase
      .from('surveys')
      .insert([{ name, slug }])
      .select()
      .single();

    if (error) {
      console.error("[API Surveys POST] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[API Surveys POST] Success:", data);
    return NextResponse.json(data);
  } catch (e) {
    console.error("[API Surveys POST] Unexpected error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, is_completed } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('surveys')
      .update({ is_completed })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("[API Surveys PATCH] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("[API Surveys PATCH] Unexpected error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

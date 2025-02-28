// app/api/dashboard/distribucion-institucional/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin, fetchFromSupabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get('tipo');
  const acreditacion = searchParams.get('acreditacion');
  const region = searchParams.get('region');
  
  const supabase = supabaseAdmin();
  
  try {
    let query = supabase
      .from('dashboard_distribucion_institucional')
      .select('*');
    
    // Aplicar filtros si existen
    if (tipo) query = query.eq('tipo', tipo);
    if (acreditacion) query = query.eq('acreditacion', acreditacion);
    if (region) query = query.eq('region', region);
    
    const data = await fetchFromSupabase(
      'dashboard_distribucion_institucional',
      query,
      'Error fetching institutional distribution'
    );
    
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


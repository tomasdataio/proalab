import { NextResponse } from "next/server"
import { supabaseAdmin, fetchFromSupabase } from "@/lib/supabase"
import { mockData } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get('tipo');
  const acreditacion = searchParams.get('acreditacion');
  const region = searchParams.get('region');
  
  console.log(`API Request: distribucion-institucional, filtros: tipo=${tipo || 'todos'}, acreditacion=${acreditacion || 'todos'}, region=${region || 'todos'}`);
  
  try {
    const supabase = supabaseAdmin();
    
    let query = supabase
      .from('dashboard_distribucion_institucional')
      .select('*');
    
    if (tipo) query = query.eq('tipo', tipo);
    if (acreditacion) query = query.eq('acreditacion', acreditacion);
    if (region) query = query.eq('region', region);
    
    const data = await fetchFromSupabase(
      'dashboard_distribucion_institucional',
      query,
      'Error fetching institutional distribution'
    );
    
    if (!data || data.length === 0) {
      console.warn('No se encontraron datos en Supabase para distribución institucional. Usando datos mock.');
      
      let mockResult = [...mockData.distribucionInstitucional];
      
      if (tipo) {
        mockResult = mockResult.filter(item => item.tipo === tipo);
      }
      if (acreditacion) {
        mockResult = mockResult.filter(item => item.acreditacion === acreditacion);
      }
      if (region) {
        mockResult = mockResult.filter(item => item.region === region);
      }
      
      return NextResponse.json({ 
        data: mockResult,
        source: 'mock'
      });
    }
    
    return NextResponse.json({ 
      data,
      source: 'database'
    });
  } catch (error: any) {
    console.error('Error en endpoint distribucion-institucional:', error.message);
    
    let mockResult = [...mockData.distribucionInstitucional];
    
    if (tipo) {
      mockResult = mockResult.filter(item => item.tipo === tipo);
    }
    if (acreditacion) {
      mockResult = mockResult.filter(item => item.acreditacion === acreditacion);
    }
    if (region) {
      mockResult = mockResult.filter(item => item.region === region);
    }
    
    return NextResponse.json({
      data: mockResult, 
      source: 'mock',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error en el servidor'
    }, { status: 200 });
  }
} 
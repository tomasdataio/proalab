export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      informalidad: {
        Row: {
          id: number
          anio: number
          region_codigo: string
          region_id: number
          lab_indicador_codigo: string
          valor_total: number
          valor_hombres: number
          valor_mujeres: number
        }
        Insert: {
          id?: number
          anio: number
          region_codigo: string
          region_id: number
          lab_indicador_codigo: string
          valor_total: number
          valor_hombres: number
          valor_mujeres: number
        }
        Update: {
          id?: number
          anio?: number
          region_codigo?: string
          region_id?: number
          lab_indicador_codigo?: string
          valor_total?: number
          valor_hombres?: number
          valor_mujeres?: number
        }
      }
      panel_region_sector: {
        Row: {
          id: number
          anio: number
          region_codigo: string
          region_id: number
          sec_codigo: string
          lab_indicador_codigo: string
          trimestre_movil: string
          valor_total: number
          valor_hombres: number
          valor_mujeres: number
        }
        Insert: {
          id?: number
          anio: number
          region_codigo: string
          region_id: number
          sec_codigo: string
          lab_indicador_codigo: string
          trimestre_movil: string
          valor_total: number
          valor_hombres: number
          valor_mujeres: number
        }
        Update: {
          id?: number
          anio?: number
          region_codigo?: string
          region_id?: number
          sec_codigo?: string
          lab_indicador_codigo?: string
          trimestre_movil?: string
          valor_total?: number
          valor_hombres?: number
          valor_mujeres?: number
        }
      }
      instituciones: {
        Row: {
          id: number
          codigo: string
          nombre: string
          tipo: string
          acreditacion: string | null
        }
        Insert: {
          id?: number
          codigo: string
          nombre: string
          tipo: string
          acreditacion?: string | null
        }
        Update: {
          id?: number
          codigo?: string
          nombre?: string
          tipo?: string
          acreditacion?: string | null
        }
      }
      matricula_2024: {
        Row: {
          id: number
          anio: number
          mat_total: number
          mat_mujeres: number
          mat_hombres: number
          mat_nobinario: number | null
          mat_primer_anio_total: number
          mat_primer_anio_mujeres: number
          mat_primer_anio_hombres: number
          mat_primer_anio_nobinario: number | null
          inst_tipo: string
          inst_tipo_nivel2: string | null
          inst_tipo_nivel3: string | null
          inst_codigo: string
          inst_nombre: string
          inst_acreditacion: string | null
          region: string
          geo_provincia: string | null
          geo_comuna: string | null
          sede: string | null
          carr_nombre: string
          carr_generica: string
          area_conocimiento: string | null
          cine_area: string | null
          cine_subarea: string | null
          carr_nivel_global: string
          carr_clasificacion_nivel1: string | null
          carr_clasificacion_nivel2: string | null
          carr_modalidad: string | null
          carr_jornada: string | null
          carr_tipo_plan: string | null
          carr_duracion_estudio: number | null
          carr_duracion_total: number | null
          carr_codigo: string
          carr_acreditacion: string | null
          indice_fortaleza_demanda: number | null
          clasificacion_fortaleza: string | null
          indice_riesgo_saturacion: number | null
          clasificacion_riesgo: string | null
          gap_90_10_primer_anio: number | null
          gap_90_10_quinto_anio: number | null
          cagr_ingreso: number | null
          empleabilidad_primer_ano: number | null
          empleabilidad_segundo_ano: number | null
          tendencia_empleabilidad: string | null
          tendencia_matricula: string | null
          sectores_principales: string[] | null
        }
        Insert: {
          id?: number
          anio: number
          mat_total: number
          mat_mujeres: number
          mat_hombres: number
          mat_nobinario?: number | null
          mat_primer_anio_total: number
          mat_primer_anio_mujeres: number
          mat_primer_anio_hombres: number
          mat_primer_anio_nobinario?: number | null
          inst_tipo: string
          inst_tipo_nivel2?: string | null
          inst_tipo_nivel3?: string | null
          inst_codigo: string
          inst_nombre: string
          inst_acreditacion?: string | null
          region: string
          geo_provincia?: string | null
          geo_comuna?: string | null
          sede?: string | null
          carr_nombre: string
          carr_generica: string
          area_conocimiento?: string | null
          cine_area?: string | null
          cine_subarea?: string | null
          carr_nivel_global: string
          carr_clasificacion_nivel1?: string | null
          carr_clasificacion_nivel2?: string | null
          carr_modalidad?: string | null
          carr_jornada?: string | null
          carr_tipo_plan?: string | null
          carr_duracion_estudio?: number | null
          carr_duracion_total?: number | null
          carr_codigo: string
          carr_acreditacion?: string | null
          indice_fortaleza_demanda?: number | null
          clasificacion_fortaleza?: string | null
          indice_riesgo_saturacion?: number | null
          clasificacion_riesgo?: string | null
          gap_90_10_primer_anio?: number | null
          gap_90_10_quinto_anio?: number | null
          cagr_ingreso?: number | null
          empleabilidad_primer_ano?: number | null
          empleabilidad_segundo_ano?: number | null
          tendencia_empleabilidad?: string | null
          tendencia_matricula?: string | null
          sectores_principales?: string[] | null
        }
        Update: {
          id?: number
          anio?: number
          mat_total?: number
          mat_mujeres?: number
          mat_hombres?: number
          mat_nobinario?: number | null
          mat_primer_anio_total?: number
          mat_primer_anio_mujeres?: number
          mat_primer_anio_hombres?: number
          mat_primer_anio_nobinario?: number | null
          inst_tipo?: string
          inst_tipo_nivel2?: string | null
          inst_tipo_nivel3?: string | null
          inst_codigo?: string
          inst_nombre?: string
          inst_acreditacion?: string | null
          region?: string
          geo_provincia?: string | null
          geo_comuna?: string | null
          sede?: string | null
          carr_nombre?: string
          carr_generica?: string
          area_conocimiento?: string | null
          cine_area?: string | null
          cine_subarea?: string | null
          carr_nivel_global?: string
          carr_clasificacion_nivel1?: string | null
          carr_clasificacion_nivel2?: string | null
          carr_modalidad?: string | null
          carr_jornada?: string | null
          carr_tipo_plan?: string | null
          carr_duracion_estudio?: number | null
          carr_duracion_total?: number | null
          carr_codigo?: string
          carr_acreditacion?: string | null
          indice_fortaleza_demanda?: number | null
          clasificacion_fortaleza?: string | null
          indice_riesgo_saturacion?: number | null
          clasificacion_riesgo?: string | null
          gap_90_10_primer_anio?: number | null
          gap_90_10_quinto_anio?: number | null
          cagr_ingreso?: number | null
          empleabilidad_primer_ano?: number | null
          empleabilidad_segundo_ano?: number | null
          tendencia_empleabilidad?: string | null
          tendencia_matricula?: string | null
          sectores_principales?: string[] | null
        }
      }
      poblacion: {
        Row: {
          id: number
          anio: number
          anio_proyeccion: number
          dem_sexo_codigo: string
          edad: number
          region: string
          region_id: number
          valor: number
        }
        Insert: {
          id?: number
          anio: number
          anio_proyeccion: number
          dem_sexo_codigo: string
          edad: number
          region: string
          region_id: number
          valor: number
        }
        Update: {
          id?: number
          anio?: number
          anio_proyeccion?: number
          dem_sexo_codigo?: string
          edad?: number
          region?: string
          region_id?: number
          valor?: number
        }
      }
    }
    Views: {
      vista_brechas_salariales: {
        Row: {
          carr_generica: string | null
          gap_90_10_primer_anio: number | null
          gap_90_10_quinto_anio: number | null
          cagr_ingreso: number | null
          region: string | null
          anio: number | null
        }
      }
      vista_distribucion_sectorial: {
        Row: {
          carr_generica: string | null
          sectores_principales: string[] | null
          region: string | null
          anio: number | null
        }
      }
      vista_fortaleza_demanda: {
        Row: {
          carr_generica: string | null
          indice_fortaleza_demanda: number | null
          clasificacion_fortaleza: string | null
          empleabilidad_primer_ano: number | null
          empleabilidad_segundo_ano: number | null
          tendencia_empleabilidad: string | null
          tendencia_matricula: string | null
          region: string | null
          anio: number | null
        }
      }
    }
    Functions: {
      [_ in string]: {
        Args: Record<string, unknown>
        Returns: unknown
      }
    }
    Enums: {
      [_ in string]: string[]
    }
    CompositeTypes: {
      [_ in string]: {
        [_ in string]: unknown
      }
    }
  }
}


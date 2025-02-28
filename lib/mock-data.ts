// lib/mock-data.ts
// Datos de ejemplo para desarrollo y pruebas

// Definir interfaces para los tipos de datos
interface InstitucionData {
  tipo: string;
  acreditacion: string;
  region: string;
  num_instituciones: number;
  num_carreras: number;
  matricula_total: number;
}

interface BrechaGeneroData {
  area: string;
  region: string;
  pct_mujeres: number;
  pct_hombres: number;
  brecha_desocupacion: number;
  brecha_informalidad: number;
}

interface SectorialData {
  sector: string;
  region: string;
  tasa_desocupacion: number;
  variabilidad: number;
  fuerza_trabajo: number;
  informalidad: number;
}

interface TendenciaSectorialData {
  sector: string;
  region: string;
  tmp_fecha: string;
  valor: number;
  crecimiento: number;
  tendencia: number;
}

interface TendenciaOcupacionalData {
  fecha: string;
  ocupacion: string;
  region: string;
  nuevos_avisos: number;
  salario_promedio: number;
  experiencia_requerida: number;
  oportunidades_remotas: number;
}

interface CarreraData {
  nombre_carrera: string;
  nombre_institucion: string;
  tipo_institucion: string;
  area_conocimiento: string;
  region: string;
  acreditacion: number;
  matricula_total: number;
  arancel: number;
  duracion: number;
}

interface AreaData {
  area_conocimiento: string;
  num_carreras: number;
  num_instituciones: number;
  matricula_total: number;
  promedio_primer_ano: number;
}

// Datos mock con tipado
export const mockData = {
  // Datos para el dashboard de distribución institucional
  distribucionInstitucional: [
    {
      tipo: "Universidades",
      acreditacion: "6 años",
      region: "Metropolitana",
      num_instituciones: 18,
      num_carreras: 580,
      matricula_total: 156000
    },
    {
      tipo: "Universidades",
      acreditacion: "5 años",
      region: "Valparaíso",
      num_instituciones: 5,
      num_carreras: 210,
      matricula_total: 42500
    },
    {
      tipo: "Centros de Formación Técnica",
      acreditacion: "4 años",
      region: "Metropolitana",
      num_instituciones: 8,
      num_carreras: 120,
      matricula_total: 28500
    },
    {
      tipo: "Institutos Profesionales",
      acreditacion: "3 años",
      region: "Biobío",
      num_instituciones: 4,
      num_carreras: 85,
      matricula_total: 12800
    }
  ] as InstitucionData[],

  // Datos para el dashboard de brechas de género
  brechasGenero: [
    {
      area: "Tecnología",
      region: "Metropolitana",
      pct_mujeres: 23.5,
      pct_hombres: 76.5,
      brecha_desocupacion: 3.2,
      brecha_informalidad: 5.8
    },
    {
      area: "Salud",
      region: "Metropolitana",
      pct_mujeres: 68.2,
      pct_hombres: 31.8,
      brecha_desocupacion: -1.5,
      brecha_informalidad: 2.1
    },
    {
      area: "Educación",
      region: "Valparaíso",
      pct_mujeres: 72.5,
      pct_hombres: 27.5,
      brecha_desocupacion: -2.1,
      brecha_informalidad: 3.5
    }
  ] as BrechaGeneroData[],

  // Datos para el dashboard de análisis sectorial
  analisisSectorial: [
    {
      sector: "Tecnología",
      region: "Metropolitana",
      tasa_desocupacion: 4.2,
      variabilidad: 15.3,
      fuerza_trabajo: 120000,
      informalidad: 12.5
    },
    {
      sector: "Comercio",
      region: "Valparaíso",
      tasa_desocupacion: 7.8,
      variabilidad: 22.1,
      fuerza_trabajo: 85000,
      informalidad: 34.2
    },
    {
      sector: "Construcción",
      region: "Biobío",
      tasa_desocupacion: 9.5,
      variabilidad: 28.7,
      fuerza_trabajo: 52000,
      informalidad: 41.3
    }
  ] as SectorialData[],

  // Datos para el dashboard de tendencias sectoriales
  tendenciasSectores: (() => {
    const result: TendenciaSectorialData[] = []
    const sectores = ["Tecnología", "Comercio", "Construcción", "Salud", "Educación"]
    const regiones = ["Metropolitana", "Valparaíso", "Biobío"]
    
    // Generar datos para los últimos 3 años por trimestre
    for (let año = 2021; año <= 2023; año++) {
      for (let trimestre = 1; trimestre <= 4; trimestre++) {
        const fecha = `${año}-V0${trimestre}`
        
        sectores.forEach(sector => {
          regiones.forEach(region => {
            // Valores aleatorios pero coherentes
            const base = (año - 2020) * 10 + (trimestre * 0.5)
            const valor = Math.floor(base * (Math.random() * 0.4 + 0.8)) * 1000
            const crecimiento = Math.floor((Math.random() * 10) - 3)
            
            result.push({
              sector,
              region,
              tmp_fecha: fecha,
              valor,
              crecimiento,
              tendencia: crecimiento > 0 ? crecimiento * 1.2 : crecimiento * 0.8
            })
          })
        })
      }
    }
    
    return result
  })(),

  // Datos para el dashboard de tendencias ocupacionales
  tendenciasOcupacionales: (() => {
    const result: TendenciaOcupacionalData[] = []
    const ocupaciones = ["Desarrollador de Software", "Administrador", "Médico", "Profesor", "Vendedor"]
    const regiones = ["Metropolitana", "Valparaíso", "Biobío"]
    
    // Generar datos para los últimos 2 años por mes
    for (let año = 2022; año <= 2023; año++) {
      for (let mes = 1; mes <= 12; mes++) {
        const fecha = `${año}-${mes.toString().padStart(2, '0')}-01`
        
        ocupaciones.forEach(ocupacion => {
          regiones.forEach(region => {
            // Valores aleatorios pero coherentes
            const base = (año - 2021) * 100 + (mes * 2)
            const nuevosAvisos = Math.floor(base * (Math.random() * 0.5 + 0.7))
            const salarioBase = ocupacion === "Desarrollador de Software" ? 1800000 : 
                       ocupacion === "Médico" ? 2200000 : 
                       ocupacion === "Administrador" ? 1200000 : 
                       ocupacion === "Profesor" ? 900000 : 700000
            
            result.push({
              fecha,
              ocupacion,
              region,
              nuevos_avisos: nuevosAvisos,
              salario_promedio: Math.floor(salarioBase * (Math.random() * 0.3 + 0.85)),
              experiencia_requerida: Math.floor(Math.random() * 6) + 1,
              oportunidades_remotas: Math.floor(nuevosAvisos * (Math.random() * 0.4 + 0.1))
            })
          })
        })
      }
    }
    
    return result
  })(),

  // Datos para el explorador de carreras
  exploradorCarreras: [
    {
      nombre_carrera: "Ingeniería Civil Informática",
      nombre_institucion: "Universidad de Chile",
      tipo_institucion: "Universidad",
      area_conocimiento: "Tecnología",
      region: "Metropolitana",
      acreditacion: 7,
      matricula_total: 1250,
      arancel: 5200000,
      duracion: 12
    },
    {
      nombre_carrera: "Medicina",
      nombre_institucion: "Pontificia Universidad Católica",
      tipo_institucion: "Universidad",
      area_conocimiento: "Salud",
      region: "Metropolitana",
      acreditacion: 7,
      matricula_total: 980,
      arancel: 7800000,
      duracion: 14
    },
    {
      nombre_carrera: "Técnico en Administración",
      nombre_institucion: "Instituto Profesional AIEP",
      tipo_institucion: "Instituto Profesional",
      area_conocimiento: "Administración y Comercio",
      region: "Valparaíso",
      acreditacion: 4,
      matricula_total: 520,
      arancel: 1800000,
      duracion: 5
    }
  ] as CarreraData[],

  // Datos para análisis por área
  analisisArea: [
    {
      area_conocimiento: "Tecnología",
      num_carreras: 85,
      num_instituciones: 28,
      matricula_total: 42500,
      promedio_primer_ano: 8500
    },
    {
      area_conocimiento: "Salud",
      num_carreras: 65,
      num_instituciones: 22,
      matricula_total: 38000,
      promedio_primer_ano: 7200
    },
    {
      area_conocimiento: "Administración y Comercio",
      num_carreras: 95,
      num_instituciones: 35,
      matricula_total: 56000,
      promedio_primer_ano: 12500
    }
  ] as AreaData[]
}; 
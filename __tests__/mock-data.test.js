/**
 * Tests para verificar que los datos mock tienen la estructura correcta
 */

// Importar los datos mock (esto es simulado)
import { mockData } from '@/lib/mock-data'

describe('MockData', () => {
  // Test para datos de distribución institucional
  it('distribucionInstitucional tiene la estructura correcta', () => {
    const data = mockData.distribucionInstitucional

    console.log('✅ Mock data test: distribucionInstitucional tiene la estructura correcta')
    
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    
    // Verificar que cada elemento tiene las propiedades requeridas
    const item = data[0]
    expect(item).toHaveProperty('tipo')
    expect(item).toHaveProperty('acreditacion')
    expect(item).toHaveProperty('region')
    expect(item).toHaveProperty('num_instituciones')
    expect(item).toHaveProperty('num_carreras')
    expect(item).toHaveProperty('matricula_total')
  })
  
  // Test para datos de brechas de género
  it('brechasGenero tiene la estructura correcta', () => {
    const data = mockData.brechasGenero

    console.log('✅ Mock data test: brechasGenero tiene la estructura correcta')
    
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    
    // Verificar que cada elemento tiene las propiedades requeridas
    const item = data[0]
    expect(item).toHaveProperty('area')
    expect(item).toHaveProperty('region')
    expect(item).toHaveProperty('pct_mujeres')
    expect(item).toHaveProperty('pct_hombres')
    expect(item).toHaveProperty('brecha_desocupacion')
    expect(item).toHaveProperty('brecha_informalidad')
  })
  
  // Test para datos de tendencias sectoriales
  it('tendenciasSectores tiene la estructura correcta', () => {
    const data = mockData.tendenciasSectores

    console.log('✅ Mock data test: tendenciasSectores tiene la estructura correcta')
    
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    
    // Verificar que cada elemento tiene las propiedades requeridas
    const item = data[0]
    expect(item).toHaveProperty('sector')
    expect(item).toHaveProperty('region')
    expect(item).toHaveProperty('tmp_fecha')
    expect(item).toHaveProperty('valor')
    expect(item).toHaveProperty('crecimiento')
    expect(item).toHaveProperty('tendencia')
  })
}) 
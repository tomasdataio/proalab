/**
 * Utilidad para manejar errores de API y proporcionar datos de fallback
 * 
 * Este archivo permite que la aplicación siga funcionando incluso cuando
 * hay errores al conectar con la base de datos o servicios externos.
 */

// Datos de fallback para diferentes endpoints
const fallbackData = {
  // Datos para tendencias de mercado
  'market_trends': [
    { sector: 'Tecnología', demand_score: 85, growth_rate: 12.5, region: 'Metropolitana' },
    { sector: 'Salud', demand_score: 78, growth_rate: 8.2, region: 'Biobío' },
    { sector: 'Educación', demand_score: 65, growth_rate: 3.1, region: 'Valparaíso' }
  ],
  
  // Datos para habilidades demandadas
  'skills_demand': [
    { skill_name: 'Programación en Python', demand_level: 92, sector: 'Tecnología' },
    { skill_name: 'Análisis de datos', demand_level: 88, sector: 'Tecnología' },
    { skill_name: 'Machine Learning', demand_level: 85, sector: 'Investigación' }
  ],
  
  // Añadir más datos de fallback según sea necesario
};

/**
 * Envuelve una función de API para proporcionar datos de fallback en caso de error
 * 
 * @param {Function} apiFunction - Función que llama a la API
 * @param {string} fallbackKey - Clave para los datos de fallback
 * @param {Object} options - Opciones adicionales (logging, timeout, etc.)
 * @returns {Promise<any>} - Resultados de la API o datos de fallback
 */
async function withFallback(apiFunction, fallbackKey, options = {}) {
  const {
    logging = true,
    timeout = 5000,
    transformResponse = (data) => data
  } = options;
  
  try {
    // Crear una promesa con timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('API timeout')), timeout);
    });
    
    // Ejecutar la función de API con un timeout
    const result = await Promise.race([
      apiFunction(),
      timeoutPromise
    ]);
    
    // Comprobar si el resultado es válido (no vacío o nulo)
    if (!result || (Array.isArray(result) && result.length === 0)) {
      if (logging) {
        console.warn(`API returned empty results for ${fallbackKey}, using fallback data`);
      }
      return transformResponse(fallbackData[fallbackKey] || []);
    }
    
    return transformResponse(result);
  } catch (error) {
    if (logging) {
      console.error(`Error in API call for ${fallbackKey}:`, error.message);
    }
    
    // Devolver datos de fallback
    return transformResponse(fallbackData[fallbackKey] || []);
  }
}

module.exports = {
  withFallback,
  fallbackData
}; 
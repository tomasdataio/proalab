 node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); async function main() { console.log('Ejecutando get_tables...'); const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); const { data, error } = await supabase.rpc('get_tables'); if (error) { console.error('Error:', error); } else { console.table(data); } } main().catch(console.error);"

Lenovo@DESKTOP-F5EMVKE MINGW64 ~/Documents/ssr (mai
Lenovo@DESKTOP-F5EMVKE MINGW64 ~/Documents/ssr (main)
$ node -e "const { createClient } = require('@supab
$ node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path:
$ node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); async function main() { console.l
$ node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); async function main() { console.log('Ejecutando get_tables...'); const supabase = cr
$ node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); async function main() { console.log('Ejecutando get_tables...'); const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, pr
$ node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); async function main() { console.log('Ejecutando get_tables...'); const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); const { data,
$ node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); async function main() { console.log('Ejecutando get_tables...'); const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); const { data, error } = await supabase.rpc('get_tables'); if (er
$ node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); async function main() { console.log('Ejecutando get_tables...'); const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); const { data, error } = await supabase.rpc('get_tables'); if (error) { console.error('Error:', error); } else { con
$ node -e "const { createClient } = require('@supabase/supabase-js'); require('dotenv').config({ path: '.env.local' }); async function main() { console.log('Ejecutando get_tables...'); const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); const { data, error } = await supabase.rpc('get_tables'); if (error) { console.error('Error:', error); } else { console.table(data); } } main().catch(console.error);"





















Ejecutando get_tables...
(node:3720) [DEP0040] DeprecationWarning: The `puny
(node:3720) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland a
(node:3720) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland al
ternative instead.
(Use `node --trace-deprecation ...` to show where t
(Use `node --trace-deprecation ...` to show where the warning was created)
┌─────────┬────────────────────────────────────────
┌─────────┬─────────────────────────────────────────────────────────┐
│ (index) │ table_name                             
│ (index) │ table_name                                              │
├─────────┼────────────────────────────────────────
├─────────┼─────────────────────────────────────────────────────────┤
│ 0       │ 'anio'                                 
│ 0       │ 'anio'                                                  │
│ 1       │ 'ponderaciones_detalladas'             
│ 1       │ 'ponderaciones_detalladas'                              │
│ 2       │ 'mapeo_trimestre_mes'                  
                 │
│ 3       │ 'mapeo_estadisticas_instituciones'     
│ 3       │ 'mapeo_estadisticas_instituciones'                      │
│ 4       │ 'schema_columns'                       
                 │
│ 5       │ 'vista_periodos_unificados'            
                 │
│ 6       │ 'carreras_2025'                        
                 │
│ 7       │ 'estadisticas_2022'                    
                 │
│ 8       │ 'users'                                
                 │
│ 9       │ 'vista_analisis_institucional'         
                 │
│ 10      │ 'vista_datos_completos'                
                 │
│ 11      │ 'empleabilidad_2025'                   
                 │
│ 12      │ 'estadisticas_2023'                    
                 │
│ 13      │ 'vista_analisis_carreras_genericas'    
│ 13      │ 'vista_analisis_carreras_genericas'                     │
│ 14      │ 'vista_estadisticas_multianual'        
│ 14      │ 'vista_estadisticas_multianual'                         │
│ 15      │ 'valores_uf'                           
                 │
│ 16      │ 'vista_comparacion_carreras_institucion
│ 16      │ 'vista_comparacion_carreras_instituciones'              │
│ 17      │ 'todos_pares'                          
                 │
│ 18      │ 'vista_estadisticas_basica'            
                 │
│ 19      │ 'empleabilidad_2022'                   
                 │
│ 20      │ 'estadisticas_2025'                    
                 │
│ 21      │ 'pares_unicos'                         
                 │
│ 22      │ 'vista_analisis_regional'              
                 │
│ 23      │ 'vista_cagr_basica'                    
                 │
│ 24      │ 'empleabilidad_2023'                   
                 │
│ 25      │ 'matricula_2024'                       
                 │
│ 26      │ 'inconsistencias'                      
                 │
│ 27      │ 'docentes_2024'                        
                 │
│ 28      │ 'vista_evolucion_genero'               
                 │
│ 29      │ 'temp_matricula_indicadores'           
                 │
│ 30      │ 'vista_tendencias_simple'              
                 │
│ 31      │ 'frecuencias'                          
                 │
│ 32      │ 'diccionario_sector_carrera'           
                 │
│ 33      │ 'region'                               
                 │
│ 34      │ 'instituciones'                        
                 │
│ 35      │ 'vista_comparacion_empleabilidad_estadi
│ 35      │ 'vista_comparacion_empleabilidad_estadisticas'          │
│ 36      │ 'mv_fortaleza_demanda_simple'          
                 │
│ 37      │ 'carreras_genericas'                   
                 │
│ 38      │ 'areas_conocimiento'                   
                 │
│ 39      │ 'vista_historial_nombres_instituciones'
│ 39      │ 'vista_historial_nombres_instituciones'                 │
│ 40      │ 'panel_region_sector'                  
                 │
│ 41      │ 'sectores_ciuu4'                       
                 │
│ 42      │ 'fuerza_trabajo'                       
                 │
│ 43      │ 'categoria_elegida'                    
                 │
│ 44      │ 'vista_ratio_matricula_empleo'         
                 │
│ 45      │ 'tasa_desocupacion'                    
                 │
│ 46      │ 'docentes_2023'                        
                 │
│ 47      │ 'informalidad'                         
                 │
│ 48      │ 'docentes_2022'                        
                 │
│ 49      │ 'diccionario_carreras'                 
                 │
│ 50      │ 'vista_fortaleza_demanda'              
                 │
│ 51      │ 'v_carrera_sector'                     
                 │
│ 52      │ 'poblacion'                            
                 │
│ 53      │ 'docentes_2021'                        
                 │
│ 54      │ 'vista_analisis_carreras_genericas_temp
│ 54      │ 'vista_analisis_carreras_genericas_temporal'            │
│ 55      │ 'vista_riesgo_saturacion'              
                 │
│ 56      │ 'pares_con_origen'                     
                 │
│ 57      │ 'temp_ponderaciones'                   
                 │
│ 58      │ 'vista_comparacion_carreras_institucion
│ 58      │ 'vista_comparacion_carreras_instituciones_temporal'     │
│ 59      │ 'tendencias_regionales'                
                 │
│ 60      │ 'sectores_economicos'                  
                 │
│ 61      │ 'instituciones_maestro'                
                 │
│ 62      │ 'tendencias_ocupacionales'             
                 │
│ 63      │ 'categorias_2025'                      
                 │
│ 64      │ 'vista_analisis_institucional_temporal'
│ 64      │ 'vista_analisis_institucional_temporal'                 │
│ 65      │ 'mapeo_carr_generica'                  
                 │
│ 66      │ 'carreras_sectores'                    
                 │
│ 67      │ 'vista_analisis_regional_temporal'     
│ 67      │ 'vista_analisis_regional_temporal'                      │
│ 68      │ 'sedes_instituciones'                  
                 │
│ 69      │ 'vista_comparacion_empleabilidad_estadi
│ 69      │ 'vista_comparacion_empleabilidad_estadisticas_temporal' │
│ 70      │ 'historico_nombres_instituciones'      
│ 70      │ 'historico_nombres_instituciones'                       │
│ 71      │ 'carreras_sin_2025'                    
                 │
│ 72      │ 'mapeo_temp'                           
                 │
│ 73      │ 'mapeo_sin_duplicados'                 
                 │
│ 74      │ 'vista_distribucion_sectorial'         
                 │
│ 75      │ 'carreras_maestro'                     
                 │
│ 76      │ 'matricula_2023'                       
                 │
│ 77      │ 'estadisticas_2024'                    
                 │
│ 78      │ 'registro_duplicados'                  
                 │
│ 79      │ 'vista_estadisticas_por_sector'        
│ 79      │ 'vista_estadisticas_por_sector'                         │
│ 80      │ 'dim_trimestre'                        
                 │
│ 81      │ 'categorias_genericas_maestro'         
                 │
│ 82      │ 'vista_matricula_por_sector_region'    
│ 82      │ 'vista_matricula_por_sector_region'                     │
│ 83      │ 'empleabilidad_2024'                   
                 │
│ 84      │ 'v_analisis_trimestre_movil'           
                 │
│ 85      │ 'carreras_2023'                        
                 │
│ 86      │ 'relacion_nombre_generica'             
                 │
│ 87      │ 'carreras_2022'                        
                 │
│ 88      │ 'vista_brechas_salariales'             
                 │
│ 89      │ 'carreras_2024'                        
                 │
│ 90      │ 'vista_carreras_categorias'            
                 │
│ 91      │ 'vista_estadisticas_carreras'          
                 │
│ 92      │ 'documentacion_sistema'                
                 │
│ 93      │ 'anios'                                
                 │
│ 94      │ 'matricula_2021'                       
                 │
│ 95      │ 'periodos'                             
                 │
│ 96      │ 'matricula_2022'                       
                 │
└─────────┴────────────────────────────────────────
└─────────┴─────────────────────────────────────────────────────────┘
-- Script para eliminar la tabla poblacion y renombrar temp_poblacion a poblacion

-- PASO 1: Eliminar la tabla poblacion actual
DROP TABLE IF EXISTS poblacion;

-- PASO 2: Renombrar la tabla temp_poblacion a poblacion
ALTER TABLE temp_poblacion RENAME TO poblacion;

-- PASO 3: Verificar el conteo de filas en la nueva tabla poblacion
SELECT COUNT(*) AS total_filas FROM poblacion; 
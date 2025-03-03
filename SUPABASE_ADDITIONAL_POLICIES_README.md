# Políticas Adicionales para Supabase

Este documento contiene políticas y configuraciones adicionales que debes implementar en Supabase para resolver los problemas de acceso a información del esquema y metadatos.

## Problema Detectado

Se ha identificado el siguiente error al intentar acceder a la información del esquema:

```
Error: relation "public.information_schema.columns" does not exist
```

Este error ocurre porque estamos intentando acceder a la vista `information_schema.columns` a través de la API de Supabase, pero no tenemos los permisos necesarios o la configuración correcta.

## Soluciones a Implementar en SQL Editor

### 1. Crear una Función para Acceder a la Información del Esquema

Esta función permitirá obtener información sobre las columnas de una tabla específica:

```sql
CREATE OR REPLACE FUNCTION get_table_columns(table_name text)
RETURNS JSONB AS $$
BEGIN
  RETURN (
    SELECT jsonb_agg(jsonb_build_object(
      'column_name', c.column_name,
      'data_type', c.data_type,
      'is_nullable', c.is_nullable,
      'column_default', c.column_default,
      'character_maximum_length', c.character_maximum_length
    ))
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
    AND c.table_name = table_name
    ORDER BY c.ordinal_position
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 2. Crear una Vista para Acceder a la Información del Esquema

Esta vista permitirá acceder a la información del esquema a través de la API de Supabase:

```sql
CREATE OR REPLACE VIEW public.schema_columns AS
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default,
  character_maximum_length
FROM information_schema.columns
WHERE table_schema = 'public';
```

### 3. Crear Permisos para la Vista

Las vistas no soportan Row Level Security (RLS) directamente. En su lugar, podemos otorgar permisos explícitos:

```sql
-- Otorgar permisos de SELECT en la vista a todos los usuarios
GRANT SELECT ON public.schema_columns TO PUBLIC;
```

### 4. Crear Políticas para Todas las Tablas

Para asegurarte de que todas las tablas tienen las políticas necesarias, ejecuta el siguiente SQL para cada tabla que necesites acceder:

```sql
-- Política para permitir SELECT en todas las tablas
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Allow select for all" ON public.%I', r.tablename);
        EXECUTE format('CREATE POLICY "Allow select for all" ON public.%I FOR SELECT USING (true)', r.tablename);
    END LOOP;
END
$$;
```

### 5. Crear Función para Ejecutar SQL Dinámico

Esta función es necesaria para aplicar migraciones y otras operaciones avanzadas:

```sql
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 6. Crear Función para Listar Tablas

```sql
CREATE OR REPLACE FUNCTION list_schema_tables()
RETURNS SETOF text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT t.tablename
    FROM pg_catalog.pg_tables t
    WHERE t.schemaname = 'public'
    ORDER BY t.tablename;
END
$$;
```

## Cómo Implementar las Soluciones

1. Inicia sesión en el [Dashboard de Supabase](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" en el menú lateral
4. Crea una nueva consulta
5. Pega el SQL de cada solución que deseas implementar
6. Ejecuta la consulta

## Consideraciones de Seguridad

Las funciones con `SECURITY DEFINER` se ejecutarán con los privilegios del usuario que las creó. Esto es necesario para acceder a la información del esquema, pero también representa un riesgo de seguridad si no se utiliza correctamente.

En un entorno de producción, es recomendable limitar quién puede ejecutar estas funciones y qué tipo de SQL puede ejecutar.

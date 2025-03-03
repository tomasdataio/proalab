# Funciones SQL para Supabase

Este documento contiene las funciones SQL que puedes implementar en Supabase para mejorar la funcionalidad de tu aplicación.

## Función para Ejecutar SQL Dinámico

Esta función permite ejecutar SQL dinámico, lo que es útil para aplicar migraciones y otras operaciones avanzadas.

```sql
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Función para Obtener Información de Tablas

Esta función devuelve información detallada sobre todas las tablas en un esquema específico.

```sql
CREATE OR REPLACE FUNCTION get_tables_info(schema_name text)
RETURNS json AS $$
BEGIN
    RETURN (
        SELECT json_agg(table_info)
        FROM (
            SELECT 
                t.tablename as table_name,
                (
                    SELECT json_agg(column_info)
                    FROM (
                        SELECT 
                            column_name,
                            data_type,
                            is_nullable,
                            column_default,
                            character_maximum_length,
                            is_identity
                        FROM information_schema.columns
                        WHERE table_schema = schema_name
                        AND table_name = t.tablename
                        ORDER BY ordinal_position
                    ) column_info
                ) as columns
            FROM pg_catalog.pg_tables t
            WHERE t.schemaname = schema_name
            ORDER BY t.tablename
        ) table_info
    );
END;
$$ LANGUAGE plpgsql;
```

## Función para Listar Tablas del Esquema

Esta función devuelve una lista de tablas en un formato más simple.

```sql
CREATE OR REPLACE FUNCTION list_schema_tables()
RETURNS TABLE (
    table_info jsonb
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        jsonb_build_object(
            'table_name', t.tablename,
            'columns', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'name', c.column_name,
                        'type', c.data_type,
                        'nullable', c.is_nullable,
                        'default', c.column_default,
                        'max_length', c.character_maximum_length,
                        'is_identity', c.is_identity
                    )
                )
                FROM information_schema.columns c
                WHERE c.table_schema = 'public'
                AND c.table_name = t.tablename
                ORDER BY c.ordinal_position
            )
        ) as table_info
    FROM pg_catalog.pg_tables t
    WHERE t.schemaname = 'public'
    ORDER BY t.tablename;
END;
$$;
```

## Cómo Implementar las Funciones

1. Inicia sesión en el [Dashboard de Supabase](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" en el menú lateral
4. Crea una nueva consulta
5. Pega el SQL de la función que deseas implementar
6. Ejecuta la consulta

## Consideraciones de Seguridad

La función `exec_sql` tiene el modificador `SECURITY DEFINER`, lo que significa que se ejecutará con los privilegios del usuario que la creó. Esto es necesario para que pueda ejecutar SQL dinámico, pero también representa un riesgo de seguridad si no se utiliza correctamente.

En un entorno de producción, es recomendable limitar quién puede ejecutar esta función y qué tipo de SQL puede ejecutar.

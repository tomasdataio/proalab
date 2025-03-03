-- Función para listar tablas y sus columnas de forma segura
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

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
                            column_default
                        FROM information_schema.columns
                        WHERE table_schema = schema_name
                        AND table_name = t.tablename
                        ORDER BY ordinal_position
                    ) column_info
                ) as columns
            FROM pg_tables t
            WHERE t.schemaname = schema_name
            ORDER BY t.tablename
        ) table_info
    );
END;
$$ LANGUAGE plpgsql;

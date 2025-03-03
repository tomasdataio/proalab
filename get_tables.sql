create or replace function get_schema_info()
returns table (
    table_name text,
    columns jsonb
) 
language plpgsql
as $$
begin
    return query
    select 
        t.table_name::text,
        jsonb_agg(
            jsonb_build_object(
                'name', c.column_name,
                'type', c.data_type,
                'nullable', c.is_nullable,
                'default', c.column_default
            )
        ) as columns
    from information_schema.tables t
    left join information_schema.columns c on c.table_name = t.table_name
    where t.table_schema = 'public'
    and t.table_type = 'BASE TABLE'
    group by t.table_name;
end;
$$;

-- Función para obtener las tablas del esquema empleabilidad
CREATE OR REPLACE FUNCTION public.get_tables()
RETURNS TABLE (table_name text) 
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT table_name::text
  FROM information_schema.tables
  WHERE table_schema = 'empleabilidad'
  AND table_type = 'BASE TABLE'
  ORDER BY table_name;
$$; 
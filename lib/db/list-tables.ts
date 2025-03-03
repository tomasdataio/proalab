import { TableInfo } from '@/types/schema'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function listTables(): Promise<TableInfo[] | null> {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookies in Server Components
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookies in Server Components
          }
        }
      }
    }
  )

  const { data: tables, error } = await supabase.rpc('list_schema_tables')

  if (error) {
    // Si la función no existe, la creamos
    if (error.message.includes('does not exist')) {
      const createFunctionSQL = `
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
      `
      await supabase.rpc('exec_sql', { sql: createFunctionSQL })
      // Intentar nuevamente después de crear la función
      return await listTables()
    }
    throw error
  }

  return tables
}

from supabase import create_client
import json
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde .env.local
load_dotenv('.env.local')

# Connection parameters
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

# Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Analizar tabla temp_poblacion
def analizar_tabla():
    try:
        # Verificar si la tabla existe
        result = supabase.table('temp_poblacion').select('*').limit(1).execute()
        
        if result.data:
            # Obtener columnas
            columns = list(result.data[0].keys())
            print(f"Columnas: {', '.join(columns)}")
            
            # Contar filas
            count_result = supabase.table('temp_poblacion').select('*', count='exact').execute()
            print(f"Total de filas: {count_result.count}")
            
            # Obtener rango de años
            min_year_result = supabase.table('temp_poblacion').select('anio').order('anio').limit(1).execute()
            max_year_result = supabase.table('temp_poblacion').select('anio').order('anio', desc=True).limit(1).execute()
            
            min_year = min_year_result.data[0]['anio'] if min_year_result.data else "N/A"
            max_year = max_year_result.data[0]['anio'] if max_year_result.data else "N/A"
            
            print(f"Rango de años: {min_year} a {max_year}")
            
            # Obtener algunos datos de muestra
            print("\nMuestra de datos:")
            sample_data = supabase.table('temp_poblacion').select('*').limit(3).execute()
            for i, row in enumerate(sample_data.data):
                print(f"\nFila {i+1}:")
                for key, value in row.items():
                    print(f"  {key}: {value}")
            
        else:
            print("La tabla 'temp_poblacion' existe pero está vacía")
    except Exception as e:
        error_msg = str(e)
        if "does not exist" in error_msg:
            print("La tabla 'temp_poblacion' no existe")
        else:
            print(f"Error al analizar tabla 'temp_poblacion': {error_msg}")

if __name__ == "__main__":
    analizar_tabla() 
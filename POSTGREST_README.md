# PostgREST en Supabase

## Descripción General
PostgREST es una herramienta que automáticamente convierte tu base de datos PostgreSQL en una API RESTful. Supabase utiliza PostgREST como su motor principal para proporcionar acceso a datos vía API.

## Características Principales

### 1. API RESTful Automática
- **Endpoints Automáticos**:
  ```http
  GET /api/todos        # Listar todos
  POST /api/todos       # Crear todo
  PATCH /api/todos?id=eq.1  # Actualizar todo
  DELETE /api/todos?id=eq.1 # Eliminar todo
  ```

### 2. Filtrado Avanzado
- **Operadores**:
  ```http
  GET /api/todos?done=is.true
  GET /api/todos?priority=gt.5
  GET /api/todos?title=ilike.*importante*
  ```

- **Operadores Disponibles**:
  - eq (igual)
  - gt (mayor que)
  - lt (menor que)
  - gte (mayor o igual)
  - lte (menor o igual)
  - neq (no igual)
  - like/ilike (coincidencia de patrones)
  - in (dentro de lista)
  - is (comparación NULL)

### 3. Selección de Columnas
```http
GET /api/todos?select=id,title,done
GET /api/todos?select=*,comments(*)
```

### 4. Ordenamiento
```http
GET /api/todos?order=created_at.desc
GET /api/todos?order=priority.desc,created_at.asc
```

### 5. Paginación
```http
GET /api/todos?limit=10&offset=0
GET /api/todos?range=0-9
```

### 6. Relaciones
- **Embebidas**:
  ```http
  GET /api/posts?select=*,comments(*)
  GET /api/posts?select=*,author(name,email)
  ```

- **Filtrado en Relaciones**:
  ```http
  GET /api/posts?select=*,comments(*)&comments.approved=is.true
  ```

## Ejemplos Prácticos

### 1. Consulta Básica
```typescript
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .eq('done', true)
```

### 2. Consulta con Relaciones
```typescript
const { data, error } = await supabase
  .from('posts')
  .select(`
    id,
    title,
    author (
      name,
      email
    ),
    comments (
      body,
      created_at
    )
  `)
```

### 3. Filtrado Complejo
```typescript
const { data, error } = await supabase
  .from('products')
  .select('*')
  .gte('price', 100)
  .lte('price', 200)
  .ilike('name', '%premium%')
```

## Mejores Prácticas

### 1. Rendimiento
- Seleccionar solo columnas necesarias
- Usar índices apropiadamente
- Limitar resultados cuando sea posible
- Optimizar consultas complejas

### 2. Seguridad
- Implementar RLS
- Validar entradas
- Limitar exposición de datos
- Usar roles apropiados

### 3. Diseño de API
- Mantener consistencia en endpoints
- Documentar filtros disponibles
- Versionar cuando sea necesario
- Manejar errores adecuadamente

## Características Avanzadas

### 1. Funciones Personalizadas
```sql
-- Definir función
CREATE FUNCTION search_items(query text) 
RETURNS SETOF items 
LANGUAGE sql
AS $$
  SELECT * FROM items 
  WHERE title ILIKE '%' || query || '%';
$$;

-- Usar vía API
GET /rpc/search_items?query=searchterm
```

### 2. Vistas
```sql
CREATE VIEW active_todos AS
SELECT * FROM todos WHERE status = 'active';

-- Acceder vía API
GET /api/active_todos
```

### 3. Procedimientos Almacenados
```sql
CREATE PROCEDURE complete_todo(todo_id int)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE todos SET done = true WHERE id = todo_id;
END;
$$;
```

## Troubleshooting

### 1. Problemas Comunes
- Errores de sintaxis en filtros
- Problemas de permisos
- Límites de paginación
- Timeouts en consultas complejas

### 2. Soluciones
- Verificar sintaxis de queries
- Revisar políticas RLS
- Optimizar consultas lentas
- Usar índices apropiados

## Recursos

### 1. Referencias
- [Documentación PostgREST](https://postgrest.org)
- [Guía Supabase](https://supabase.com/docs/guides/database/api)
- [Referencia API](https://supabase.com/docs/reference/javascript/select)

### 2. Herramientas
- Cliente API Supabase
- Swagger/OpenAPI
- Herramientas de testing
- Monitores de rendimiento
# Supabase Storage

## Descripción General
Supabase Storage es un sistema de almacenamiento de objetos construido sobre S3, diseñado para manejar archivos de manera eficiente y segura. Se integra nativamente con las políticas de seguridad de Supabase y proporciona una capa de abstracción simple pero potente para el manejo de archivos.

## Características Clave

### 1. Gestión de Archivos
- **Operaciones CRUD**:
  ```typescript
  // Ejemplo de uso básico
  const { data, error } = await supabase.storage
    .from('bucket')
    .upload('folder/file.pdf', fileBody)
  ```
  - Upload con progreso
  - Download streaming
  - Eliminación segura
  - Listado paginado
  - Operaciones batch

### 2. Seguridad Avanzada
- **Políticas de Acceso**:
  ```sql
  -- Ejemplo de política RLS
  CREATE POLICY "public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'public');
  ```
  - Integración con Auth
  - URLs firmadas
  - Tokens temporales

### 3. Optimización de Imágenes
- **Transformaciones en Tiempo Real**:
  ```typescript
  const { data } = await supabase.storage
    .from('images')
    .getPublicUrl('avatar.jpg', {
      transform: {
        width: 100,
        height: 100,
        quality: 80
      }
    })
  ```
  - Resize automático
  - Optimización de formato
  - Compresión inteligente

### 4. Organización
- **Sistema de Buckets**:
  ```typescript
  const { data } = await supabase.storage
    .createBucket('assets', {
      public: false,
      fileSizeLimit: 1024 * 1024 * 10 // 10MB
    })
  ```
  - Jerarquía de carpetas
  - Metadatos extensibles
  - Búsqueda eficiente

## Ejemplos Prácticos

### 1. Upload de Archivo
```typescript
const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('bucket')
    .upload(`folder/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false
    })
}
```

### 2. Descarga con Progreso
```typescript
const downloadFile = async (path: string) => {
  const { data, error } = await supabase.storage
    .from('bucket')
    .download(path, {
      onProgress: (progress) => {
        console.log(`Downloaded: ${progress}%`)
      }
    })
}
```

### 3. Transformación de Imagen
```typescript
const getOptimizedImage = async (path: string) => {
  const { data } = await supabase.storage
    .from('images')
    .getPublicUrl(path, {
      transform: {
        width: 800,
        height: 600,
        quality: 80,
        format: 'webp'
      }
    })
}
```

## Mejores Prácticas

### 1. Organización
- Usar buckets por propósito
- Mantener estructura clara
- Implementar convenciones de nombres
- Documentar organización

### 2. Seguridad
- Configurar RLS apropiadamente
- Usar URLs firmadas para contenido sensible
- Implementar validación de tipos
- Monitorear accesos

### 3. Performance
- Optimizar imágenes automáticamente
- Usar CDN cuando sea posible
- Implementar caching estratégico
- Manejar errores gracefully

## Troubleshooting

### 1. Problemas Comunes
- Errores de permisos
- Límites de tamaño
- Tipos de archivo no permitidos
- Problemas de CORS

### 2. Soluciones
- Verificar políticas RLS
- Revisar configuración de buckets
- Validar tipos MIME
- Configurar CORS apropiadamente

## Recursos

### 1. Referencias
- [Documentación Oficial](https://supabase.com/docs/guides/storage)
- [API Reference](https://supabase.com/docs/reference/javascript/storage-createbucket)
- [Ejemplos de Código](https://github.com/supabase/supabase/tree/master/examples)

### 2. Herramientas
- Dashboard de Storage
- CLI para gestión
- SDKs oficiales
- Utilidades de desarrollo

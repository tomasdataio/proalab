# Supabase Auth

## Descripción General
Supabase Auth es un sistema completo de autenticación y autorización que se integra nativamente con PostgreSQL. Proporciona una solución robusta y segura para manejar la autenticación de usuarios y el control de acceso.

## Características Principales

### 1. Métodos de Autenticación

#### Email/Password
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@ejemplo.com',
  password: 'contraseña-segura'
})
```
- Validación personalizable
- Recuperación de contraseñas
- Confirmación de email
- Protección contra ataques de fuerza bruta

#### OAuth Social
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})
```
- Google
- GitHub
- Facebook
- Twitter
- Discord
- Azure
- Apple
- Otros proveedores configurables

#### Magic Links
```typescript
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'usuario@ejemplo.com'
})
```
- Enlaces de un solo uso
- Expiración configurable
- Personalización de emails
- Sin necesidad de contraseñas

#### Phone Auth
```typescript
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+34600000000'
})
```
- Verificación por SMS
- Códigos temporales
- Integración internacional
- Validación de números

### 2. Gestión de Sesiones

#### Manejo de Tokens
```typescript
const { data: { session } } = await supabase.auth.getSession()
```
- JWT tokens
- Refresh tokens
- Control de expiración
- Revocación de sesiones

#### Persistencia
```typescript
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})
```
- Estado global
- Sincronización multi-pestaña
- Recuperación automática
- Manejo de desconexiones

### 3. Row Level Security (RLS)

#### Políticas Básicas
```sql
CREATE POLICY "usuarios_pueden_ver_sus_datos"
ON public.perfiles
FOR SELECT
USING (auth.uid() = user_id);
```

#### Políticas Avanzadas
```sql
CREATE POLICY "admin_full_access"
ON public.usuarios
USING (
  EXISTS (
    SELECT 1 FROM roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);
```

### 4. Personalización

#### Emails
```typescript
const { data, error } = await supabase.auth.updateUser({
  email: 'nuevo@email.com'
})
```
- Plantillas personalizadas
- Múltiples idiomas
- Branding personalizado
- Enlaces personalizados

#### Flujos de Autenticación
- Redirecciones personalizadas
- Callbacks personalizados
- Hooks pre/post autenticación
- Validación personalizada

## Implementación

### 1. Configuración Inicial
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tu-proyecto.supabase.co',
  'tu-anon-key'
)
```

### 2. Manejo de Usuarios
```typescript
// Registro
const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nombre: 'Usuario',
        plan: 'free'
      }
    }
  })
}

// Login
const signIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
}

// Logout
const signOut = async () => {
  const { error } = await supabase.auth.signOut()
}
```

### 3. Middleware de Autenticación
```typescript
// Next.js ejemplo
export const middleware = async (req) => {
  const { supabase } = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect('/login')
  }
}
```

## Mejores Prácticas

### 1. Seguridad
- Usar HTTPS siempre
- Implementar RLS
- Validar inputs
- Manejar errores apropiadamente

### 2. UX
- Feedback claro
- Estados de carga
- Manejo de errores amigable
- Redirecciones suaves

### 3. Performance
- Cachear sesión
- Precargar datos
- Optimizar queries
- Manejar reconexiones

## Troubleshooting

### 1. Problemas Comunes
- Tokens expirados
- Errores de CORS
- Problemas de redirección
- Fallos de RLS

### 2. Soluciones
- Refresh token automático
- Configuración de CORS
- Validación de URLs
- Testing de políticas

## Recursos

### 1. Referencias
- [Documentación Oficial](https://supabase.com/docs/guides/auth)
- [Ejemplos de Código](https://github.com/supabase/supabase/tree/master/examples)
- [Guías de Seguridad](https://supabase.com/docs/guides/auth/security)

### 2. Herramientas
- Dashboard de Auth
- Herramientas de debugging
- Templates de email
- Utilidades de testing

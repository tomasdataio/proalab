# Políticas de Seguridad para Supabase

Este documento contiene las políticas de seguridad que debes implementar en Supabase para que tu aplicación funcione correctamente.

## Políticas para la Tabla `users`

La tabla `users` necesita las siguientes políticas para funcionar correctamente:

### 1. Política para permitir la inserción de nuevos usuarios

Esta política permite la inserción de nuevos usuarios sin restricciones.

```sql
DROP POLICY IF EXISTS "Allow insert for users" ON public.users;
CREATE POLICY "Allow insert for users" ON public.users
    FOR INSERT WITH CHECK (true);
```

### 2. Política para permitir a los usuarios ver su propio perfil

Esta política ya debería estar implementada, pero la incluimos por completitud.

```sql
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);
```

### 3. Política para permitir a los usuarios actualizar su propio perfil

Esta política ya debería estar implementada, pero la incluimos por completitud.

```sql
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);
```

## Cómo Implementar las Políticas

1. Inicia sesión en el [Dashboard de Supabase](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" en el menú lateral
4. Crea una nueva consulta
5. Pega el SQL de la política que deseas implementar
6. Ejecuta la consulta

## Consideraciones de Seguridad

La política "Allow insert for users" permite la inserción de usuarios sin restricciones. En un entorno de producción, es posible que desees agregar algunas restricciones adicionales.

### Opciones Alternativas para la Política de Inserción

#### Permitir solo a usuarios autenticados crear nuevos usuarios:

```sql
DROP POLICY IF EXISTS "Allow insert for users" ON public.users;
CREATE POLICY "Allow authenticated users to insert" ON public.users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

#### Permitir solo a administradores crear nuevos usuarios:

```sql
DROP POLICY IF EXISTS "Allow insert for users" ON public.users;
CREATE POLICY "Allow admins to insert" ON public.users
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM admins));
```

Elige la opción que mejor se adapte a tus necesidades de seguridad.

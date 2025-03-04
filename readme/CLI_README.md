# Supabase CLI

## Descripción General
La CLI (Command Line Interface) de Supabase es una herramienta poderosa que permite gestionar proyectos Supabase desde la terminal. Facilita el desarrollo local, el despliegue y la gestión de proyectos Supabase de manera eficiente.

## Instalación y Configuración

### Métodos de Instalación
- **NPM Global**:
  ```bash
  npm install -g supabase
  ```
- **Homebrew (macOS)**:
  ```bash
  brew install supabase/tap/supabase
  ```
- **Scoop (Windows)**:
  ```bash
  scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
  scoop install supabase
  ```
- **Docker**:
  ```bash
  docker pull supabase/cli
  ```

### Configuración Inicial
```bash
supabase login
supabase init
```

## Características Principales

### 1. Desarrollo Local
- **Entorno Local**:
  - Levanta toda la infraestructura localmente
  - Incluye base de datos, auth, storage, y APIs
  - Hot-reload para cambios en tiempo real
  - Debugging simplificado

- **Comandos Básicos**:
  ```bash
  supabase start    # Inicia el entorno local
  supabase stop     # Detiene el entorno
  supabase status   # Muestra el estado actual
  ```

### 2. Gestión de Base de Datos
- **Migraciones**:
  - Generación automática de migraciones
  - Control de versiones de schema
  - Rollback de cambios
  - Seed data para desarrollo

- **Comandos de DB**:
  ```bash
  supabase db pull     # Obtiene el schema actual
  supabase db push     # Aplica cambios al schema
  supabase db reset    # Resetea la base de datos
  supabase db diff     # Muestra diferencias
  ```

### 3. Gestión de Proyectos
- **Proyectos**:
  - Creación y eliminación
  - Configuración de entornos
  - Gestión de secretos
  - Monitoreo de recursos

- **Comandos de Proyecto**:
  ```bash
  supabase projects create
  supabase projects list
  supabase secrets set
  supabase projects switch
  ```

### 4. Funciones Edge
- **Gestión de Functions**:
  - Desarrollo local de funciones
  - Despliegue automatizado
  - Logs y debugging
  - Versionado

- **Comandos de Functions**:
  ```bash
  supabase functions new
  supabase functions deploy
  supabase functions serve
  supabase functions delete
  ```

### 5. Testing y CI/CD
- **Testing**:
  - Tests automatizados
  - Entornos de prueba
  - Integración con CI
  - Validación de cambios

- **Comandos de Testing**:
  ```bash
  supabase test db
  supabase test api
  supabase test e2e
  ```

## Flujos de Trabajo Comunes

### 1. Inicio de Proyecto
```bash
supabase init
supabase start
supabase db pull
```

### 2. Desarrollo de Features
```bash
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Modificar schema
supabase db diff --schema-only > migrations/nueva-feature.sql

# Probar cambios
supabase db reset
supabase test db

# Desplegar
supabase db push
```

### 3. CI/CD Pipeline
```bash
# En GitHub Actions
supabase db pull --db-url=$STAGING_DB_URL
supabase db push --db-url=$PROD_DB_URL
```

## Mejores Prácticas

### 1. Gestión de Migraciones
- Usar nombres descriptivos
- Una migración por feature
- Incluir rollback scripts
- Documentar cambios complejos

### 2. Seguridad
- No commitear credenciales
- Usar variables de entorno
- Revisar permisos RLS
- Backup antes de migraciones

### 3. Desarrollo
- Usar branches para features
- Testear migraciones localmente
- Mantener sincronizado development/production
- Usar seed data representativa

## Troubleshooting Común

### 1. Problemas de Conexión
- Verificar credenciales
- Comprobar firewall
- Revisar logs de Docker
- Validar configuración de red

### 2. Errores de Migración
- Backup previo
- Revisar dependencias
- Validar sintaxis SQL
- Comprobar permisos

### 3. Problemas de Performance
- Monitorear recursos
- Optimizar queries
- Usar índices apropiados
- Revisar logs

## Extensiones y Plugins

### 1. IDE Integration
- VS Code
- JetBrains
- Vim/Neovim
- Sublime Text

### 2. CI Tools
- GitHub Actions
- GitLab CI
- CircleCI
- Jenkins

## Recursos Adicionales
- Documentación oficial
- Ejemplos de proyectos
- Comunidad Discord
- Tutoriales y workshops

## Actualizaciones y Mantenimiento
- Actualizar CLI regularmente
- Revisar changelog
- Seguir blog oficial
- Participar en la comunidad

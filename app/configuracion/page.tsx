import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata = {
  title: "Configuración",
  description: "Configuración de la plataforma de análisis del mercado laboral",
}

export default function ConfiguracionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>
      
      <Tabs defaultValue="cuenta" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
          <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cuenta">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Cuenta</CardTitle>
              <CardDescription>
                Gestiona la información de tu cuenta y cambia tu contraseña.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" placeholder="Tu nombre" defaultValue="Usuario Ejemplo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" placeholder="Tu correo electrónico" defaultValue="usuario@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizacion">Organización</Label>
                  <Input id="organizacion" placeholder="Tu organización" defaultValue="Empresa Ejemplo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rol">Rol</Label>
                  <Select defaultValue="analista">
                    <SelectTrigger id="rol">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrador">Administrador</SelectItem>
                      <SelectItem value="analista">Analista</SelectItem>
                      <SelectItem value="usuario">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Cambiar contraseña</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password-actual">Contraseña actual</Label>
                    <Input id="password-actual" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-nuevo">Nueva contraseña</Label>
                    <Input id="password-nuevo" type="password" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Guardar cambios</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferencias">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>
                Personaliza la apariencia y el comportamiento de la plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Apariencia</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tema">Tema</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="tema" className="w-[180px]">
                      <SelectValue placeholder="Selecciona un tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animaciones">Animaciones</Label>
                    <p className="text-sm text-muted-foreground">
                      Activar animaciones en la interfaz
                    </p>
                  </div>
                  <Switch id="animaciones" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Visualización de datos</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="formato-moneda">Formato de moneda</Label>
                    <p className="text-sm text-muted-foreground">
                      Selecciona el formato de moneda para los valores monetarios
                    </p>
                  </div>
                  <Select defaultValue="clp">
                    <SelectTrigger id="formato-moneda" className="w-[180px]">
                      <SelectValue placeholder="Selecciona un formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clp">Peso Chileno (CLP)</SelectItem>
                      <SelectItem value="usd">Dólar (USD)</SelectItem>
                      <SelectItem value="eur">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="decimales">Decimales</Label>
                    <p className="text-sm text-muted-foreground">
                      Número de decimales a mostrar en los valores numéricos
                    </p>
                  </div>
                  <Select defaultValue="2">
                    <SelectTrigger id="decimales" className="w-[180px]">
                      <SelectValue placeholder="Selecciona un número" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Guardar preferencias</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notificaciones">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Configura las notificaciones que deseas recibir.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificaciones por correo electrónico</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notif-informes">Nuevos informes</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones cuando se publiquen nuevos informes
                      </p>
                    </div>
                    <Switch id="notif-informes" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notif-actualizaciones">Actualizaciones de datos</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones cuando se actualicen los datos
                      </p>
                    </div>
                    <Switch id="notif-actualizaciones" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notif-noticias">Noticias y eventos</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones sobre noticias y eventos relacionados
                      </p>
                    </div>
                    <Switch id="notif-noticias" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Frecuencia de notificaciones</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="frecuencia">Frecuencia</Label>
                  <Select defaultValue="inmediata">
                    <SelectTrigger id="frecuencia" className="w-[180px]">
                      <SelectValue placeholder="Selecciona una frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inmediata">Inmediata</SelectItem>
                      <SelectItem value="diaria">Diaria</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Guardar configuración</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
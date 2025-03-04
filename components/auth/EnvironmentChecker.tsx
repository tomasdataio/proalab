"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { createBrowserClient } from "@/lib/supabase"

export function EnvironmentChecker() {
  const [envInfo, setEnvInfo] = useState<Record<string, string>>({})
  const [supabaseConfig, setSupabaseConfig] = useState<any>(null)
  
  useEffect(() => {
    // Recopilar información del entorno
    const info: Record<string, string> = {
      origin: window.location.origin,
      href: window.location.href,
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      host: window.location.host,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'No definido',
      NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL || 'No definido',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'No definido',
    }
    
    setEnvInfo(info)
    
    // Verificar configuración de Supabase
    const checkSupabaseConfig = async () => {
      try {
        const supabase = createBrowserClient()
        // Obtenemos información de forma segura
        const config = {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'No disponible',
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          // Verificar que la autenticación funciona
          authConfigured: false
        }
        
        // Verificar si la autenticación está configurada
        try {
          const { data } = await supabase.auth.getSession()
          config.authConfigured = true
        } catch (e) {
          console.error("Error al verificar autenticación:", e)
        }
        
        setSupabaseConfig(config)
      } catch (error) {
        console.error("Error al obtener configuración de Supabase:", error)
        setSupabaseConfig({ error: 'Error al obtener configuración' })
      }
    }
    
    checkSupabaseConfig()
  }, [])
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Información del Entorno</CardTitle>
        <CardDescription>
          Verifica la configuración actual del entorno y Supabase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="environment">
            <AccordionTrigger>Variables de Entorno</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {Object.entries(envInfo).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-1">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="supabase">
            <AccordionTrigger>Configuración de Supabase</AccordionTrigger>
            <AccordionContent>
              {supabaseConfig ? (
                <div className="space-y-2">
                  {Object.entries(supabaseConfig).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-1">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Cargando configuración...</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Asegúrate de que la URL de redirección de OAuth esté configurada correctamente en la consola de Supabase.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            URL de redirección recomendada: <code>{envInfo.origin}/auth/callback</code>
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 
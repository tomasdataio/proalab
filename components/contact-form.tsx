"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    institucion: "",
    mensaje: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de envío del formulario
    console.log(formData)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-medium">
                Nombre
              </label>
              <Input
                id="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="institucion" className="text-sm font-medium">
              Institución
            </label>
            <Input
              id="institucion"
              placeholder="Nombre de tu institución"
              value={formData.institucion}
              onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="mensaje" className="text-sm font-medium">
              Mensaje
            </label>
            <Textarea
              id="mensaje"
              placeholder="¿Cómo podemos ayudar?"
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full bg-[#FF7B7B] hover:bg-[#ff6b6b]">
            Enviar Mensaje
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


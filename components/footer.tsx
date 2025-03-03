import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PROA-Logo.jpg-MKe5kSJEt6uHFUcIMAUPzuqGXCzEeC.jpeg"
              alt="PROA Consulting Logo"
              width={140}
              height={50}
              className="mb-4 dark:brightness-200"
            />
            <p className="text-sm text-muted-foreground">Transformando la educación con inteligencia de mercado</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Dashboards</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboards/tendencias-ocupacionales"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Análisis de Mercado
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboards/distribucion-institucional"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Benchmarking Educativo
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboards/explorador-carreras"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Trayectorias Profesionales
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentación
                </Link>
              </li>
              <li>
                <Link href="/casos" className="text-muted-foreground hover:text-primary transition-colors">
                  Casos de Estudio
                </Link>
              </li>
              <li>
                <Link href="/soporte" className="text-muted-foreground hover:text-primary transition-colors">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Rosario Sur 620 of 41</li>
              <li>Las Condes, Chile</li>
              <li>
                <a href="mailto:contacto@proaconsulting.cl" className="hover:text-primary transition-colors">
                  contacto@proaconsulting.cl
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/proaconsulting"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}


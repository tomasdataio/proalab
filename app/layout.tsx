import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createServerComponentSupabaseClient } from "@/lib/supabase-server"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

export const metadata: Metadata = {
  title: "PROA Consulting - Análisis Educativo",
  description: "Capturando el Momentum de los mercados laborales en America Latina",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className={`${jakarta.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header session={session} />
          <main className="min-h-screen bg-background text-foreground">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
-- ============================================================
-- PORTAFOLIO WEB - Supabase Migration
-- Corre este script en el SQL Editor de tu proyecto Supabase
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================================

-- Tabla de proyectos
CREATE TABLE IF NOT EXISTS public.projects (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url   TEXT,
  tags        TEXT[] DEFAULT '{}',
  demo_url    TEXT DEFAULT '/not-found',
  repo_url    TEXT DEFAULT '/not-found',
  "order"     INTEGER DEFAULT 0,
  visible     BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Lectura pública (cualquiera puede ver proyectos visibles)
CREATE POLICY "Public can view visible projects"
  ON public.projects FOR SELECT
  USING (visible = true);

-- Solo usuarios autenticados (admin) pueden modificar
CREATE POLICY "Authenticated users can insert"
  ON public.projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update"
  ON public.projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete"
  ON public.projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- Seed data: los 5 proyectos actuales
INSERT INTO public.projects (title, description, image_url, tags, demo_url, repo_url, "order", visible) VALUES
(
  'BBQ Sabor y Presentación',
  'Sistema de gestión y carta digital interactiva para restaurante, con administración de platillos, categorías y pedidos en tiempo real.',
  NULL,
  ARRAY['Vue.js', 'Vite', 'Firebase'],
  'https://bbq-saborypresentacion.netlify.app/',
  '/not-found',
  1,
  true
),
(
  'Mocondino Conecta',
  'Plataforma digital comunitaria integral para la gestión de juntas, promoción de talento local y negocios en Mocondino. Fomentando transparencia y participación ciudadana.',
  NULL,
  ARRAY['Vue.js', 'Vite', 'Firebase'],
  'https://mocondinoconecta.netlify.app/',
  '/not-found',
  2,
  true
),
(
  'AI Business Automation',
  'Sistema de automatización industrial integrando Python y modelos de IA para la optimización de flujos de trabajo operativos.',
  NULL,
  ARRAY['Python', 'TensorFlow', 'Node.js'],
  '/not-found',
  '/not-found',
  3,
  true
),
(
  'Financial Data Dashboard',
  'Panel avanzado desarrollado en Power BI y React para la visualización de métricas contables y análisis predictivo.',
  NULL,
  ARRAY['Power BI', 'React', 'D3.js'],
  '/not-found',
  '/not-found',
  4,
  true
),
(
  'Inventory Control System',
  'Aplicación Full Stack robusta para el control de inventarios y gestión de recursos empresariales a gran escala.',
  NULL,
  ARRAY['Java', 'Spring Boot', 'MySQL'],
  '/not-found',
  '/not-found',
  5,
  true
);

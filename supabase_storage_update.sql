-- ============================================================
-- PORTAFOLIO WEB — Update Script (VERSIÓN CORREGIDA)
-- 
-- IMPORTANTE: El bucket "project-covers" se crea desde el
-- dashboard de Supabase (no por SQL). Ver instrucciones abajo.
--
-- Ejecuta SOLO este SQL en: Dashboard → SQL Editor → New query
-- ============================================================

-- ══════════════════════════════════════════════════════════
-- PARTE 1 — Columnas en la tabla projects
-- ══════════════════════════════════════════════════════════

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'projects'
      AND column_name  = 'category'
  ) THEN
    ALTER TABLE public.projects
      ADD COLUMN category TEXT NOT NULL DEFAULT 'personal';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'projects'
      AND column_name  = 'whatsapp_msg'
  ) THEN
    ALTER TABLE public.projects
      ADD COLUMN whatsapp_msg TEXT DEFAULT NULL;
  END IF;
END $$;

-- CHECK constraint (idempotente)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname    = 'projects_category_check'
      AND conrelid   = 'public.projects'::regclass
  ) THEN
    ALTER TABLE public.projects
      ADD CONSTRAINT projects_category_check
      CHECK (category IN ('empresa', 'personal'));
  END IF;
END $$;

-- Marcar proyectos de empresa por título
UPDATE public.projects
SET category = 'empresa'
WHERE title IN (
  'BBQ Sabor y Presentación',
  'Mocondino Conecta'
);

-- ══════════════════════════════════════════════════════════
-- PARTE 2 — Política SELECT mejorada en projects
-- (admin autenticado ve también los proyectos ocultos)
-- ══════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "Public can view visible projects" ON public.projects;

CREATE POLICY "Public can view visible projects"
  ON public.projects FOR SELECT
  USING (
    visible = true
    OR auth.role() = 'authenticated'
  );

-- ══════════════════════════════════════════════════════════
-- PARTE 3 — Políticas de Storage para el bucket
--
-- Ejecuta esto DESPUÉS de crear el bucket desde el dashboard.
-- Si las políticas ya existen, el DO $$ las omite sin error.
-- ══════════════════════════════════════════════════════════

-- Limpia políticas anteriores si existen
DROP POLICY IF EXISTS "Public read project covers"          ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload project covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update project covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete project covers" ON storage.objects;

-- Lectura pública: cualquiera puede ver las imágenes
CREATE POLICY "Public read project covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-covers');

-- Solo admins pueden subir
CREATE POLICY "Authenticated upload project covers"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id  = 'project-covers'
    AND auth.role() = 'authenticated'
  );

-- Solo admins pueden actualizar
CREATE POLICY "Authenticated update project covers"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id  = 'project-covers'
    AND auth.role() = 'authenticated'
  );

-- Solo admins pueden eliminar
CREATE POLICY "Authenticated delete project covers"
  ON storage.objects FOR DELETE
  USING (
    bucket_id  = 'project-covers'
    AND auth.role() = 'authenticated'
  );

-- ══════════════════════════════════════════════════════════
-- VERIFICACIÓN (descomenta y ejecuta por separado)
-- ══════════════════════════════════════════════════════════
-- SELECT id, name, public FROM storage.buckets WHERE id = 'project-covers';
-- SELECT policyname, cmd FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%project covers%';
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'projects' AND column_name IN ('category','whatsapp_msg');
-- SELECT title, category FROM public.projects ORDER BY "order";

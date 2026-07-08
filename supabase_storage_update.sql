-- ============================================================
-- PORTAFOLIO WEB — Storage + Category Update
-- Ejecuta este script en el SQL Editor de Supabase
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================================

-- ── 1. Agregar columnas nuevas ──────────────────────────────
-- Se usa DO $$ para garantizar orden de ejecución dentro
-- de un bloque transaccional.

DO $$
BEGIN

  -- Columna category
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'projects'
      AND column_name  = 'category'
  ) THEN
    ALTER TABLE public.projects
      ADD COLUMN category TEXT NOT NULL DEFAULT 'personal';
  END IF;

  -- Columna whatsapp_msg
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

-- ── 2. Agregar CHECK constraint si no existe ────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name   = 'projects'
      AND column_name  = 'category'
      AND constraint_name = 'projects_category_check'
  ) THEN
    ALTER TABLE public.projects
      ADD CONSTRAINT projects_category_check
      CHECK (category IN ('empresa', 'personal'));
  END IF;
END $$;

-- ── 3. Marcar proyectos de empresa ──────────────────────────
-- Ajusta los títulos si los cambiaste en Supabase
UPDATE public.projects
SET category = 'empresa'
WHERE title IN (
  'BBQ Sabor y Presentación',
  'Mocondino Conecta'
);

-- El resto queda con el DEFAULT 'personal'

-- ── 4. Storage bucket para portadas ────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-covers',
  'project-covers',
  true,
  5242880,
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ── 5. Políticas Storage (idempotentes) ─────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename  = 'objects'
      AND policyname = 'Public read project covers'
  ) THEN
    CREATE POLICY "Public read project covers"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'project-covers');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename  = 'objects'
      AND policyname = 'Authenticated upload project covers'
  ) THEN
    CREATE POLICY "Authenticated upload project covers"
      ON storage.objects FOR INSERT
      WITH CHECK (
        bucket_id = 'project-covers'
        AND auth.role() = 'authenticated'
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename  = 'objects'
      AND policyname = 'Authenticated delete project covers'
  ) THEN
    CREATE POLICY "Authenticated delete project covers"
      ON storage.objects FOR DELETE
      USING (
        bucket_id = 'project-covers'
        AND auth.role() = 'authenticated'
      );
  END IF;
END $$;

-- ── 6. Política SELECT mejorada (admin ve proyectos ocultos) ─
DROP POLICY IF EXISTS "Public can view visible projects" ON public.projects;

CREATE POLICY "Public can view visible projects"
  ON public.projects FOR SELECT
  USING (
    visible = true
    OR auth.role() = 'authenticated'
  );

-- ── Verificación (opcional) ─────────────────────────────────
-- Descomenta para confirmar:
-- SELECT id, title, category, whatsapp_msg FROM public.projects ORDER BY "order";
-- SELECT * FROM storage.buckets WHERE id = 'project-covers';

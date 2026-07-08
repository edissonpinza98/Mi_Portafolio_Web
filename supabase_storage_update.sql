-- ============================================================
-- PORTAFOLIO WEB - Storage Update
-- Ejecuta este script DESPUÉS del supabase_migration.sql
-- Ve a: https://supabase.com/dashboard/project/_/sql/new
-- ============================================================

-- ────────────────────────────────────────────────────────
-- 1. Crear el bucket para portadas de proyectos
-- ────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-covers',
  'project-covers',
  true,                          -- acceso público (las portadas son visibles para todos)
  5242880,                       -- 5 MB máximo por imagen
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO NOTHING;    -- no falla si ya existe

-- ────────────────────────────────────────────────────────
-- 2. Políticas RLS del bucket
-- ────────────────────────────────────────────────────────

-- Lectura pública: cualquiera puede ver las imágenes
CREATE POLICY "Public read project covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-covers');

-- Solo admins autenticados pueden subir imágenes
CREATE POLICY "Authenticated upload project covers"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'project-covers'
    AND auth.role() = 'authenticated'
  );

-- Solo admins pueden actualizar imágenes
CREATE POLICY "Authenticated update project covers"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'project-covers'
    AND auth.role() = 'authenticated'
  );

-- Solo admins pueden eliminar imágenes
CREATE POLICY "Authenticated delete project covers"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'project-covers'
    AND auth.role() = 'authenticated'
  );

-- ────────────────────────────────────────────────────────
-- 3. (Opcional) Actualizar la política SELECT de projects
--    para que el admin también vea los proyectos ocultos
-- ────────────────────────────────────────────────────────

-- Primero elimina la política pública original
DROP POLICY IF EXISTS "Public can view visible projects" ON public.projects;

-- Política pública: solo proyectos visibles
CREATE POLICY "Public can view visible projects"
  ON public.projects FOR SELECT
  USING (
    visible = true
    OR auth.role() = 'authenticated'   -- el admin ve todos
  );

-- ────────────────────────────────────────────────────────
-- Verificación (opcional, puedes ejecutarla aparte)
-- ────────────────────────────────────────────────────────
-- SELECT * FROM storage.buckets WHERE id = 'project-covers';
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%project covers%';

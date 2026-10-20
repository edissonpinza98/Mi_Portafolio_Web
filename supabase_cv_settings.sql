-- ══════════════════════════════════════════════════════
--  CV MANAGEMENT (Hoja de Vida PDF & Links)
--  Ejecuta esto en Supabase > SQL Editor si deseas asegurar las claves
-- ══════════════════════════════════════════════════════

-- 1. Asegurar tabla site_settings
create table if not exists public.site_settings (
  key   text primary key,
  value text,
  updated_at timestamptz default now()
);

-- 2. Filas iniciales para el CV
insert into public.site_settings (key, value)
values 
  ('cv_pdf_url', null),
  ('cv_full_request_url', 'https://wa.link/y26h7a')
on conflict (key) do nothing;

-- 3. Habilitar RLS y políticas
alter table public.site_settings enable row level security;

-- Lectura pública (para que el portafolio pueda leer sin login)
create policy "Public can read site_settings_cv"
  on public.site_settings for select
  using (true);

-- Solo administradores autenticados pueden modificar
create policy "Auth users can update site_settings_cv"
  on public.site_settings for update
  using (auth.role() = 'authenticated');

create policy "Auth users can insert site_settings_cv"
  on public.site_settings for insert
  with check (auth.role() = 'authenticated');

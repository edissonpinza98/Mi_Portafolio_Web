-- ══════════════════════════════════════════════════════
--  PROFILE PHOTO MANAGEMENT
--  Ejecuta esto en Supabase > SQL Editor
-- ══════════════════════════════════════════════════════

-- 1. Tabla site_settings (clave-valor para configuraciones globales)
create table if not exists site_settings (
  key   text primary key,
  value text,
  updated_at timestamptz default now()
);

-- 2. Fila inicial para la foto de perfil (vacía por defecto)
insert into site_settings (key, value)
values ('hero_photo', null)
on conflict (key) do nothing;

-- 3. Row Level Security
alter table site_settings enable row level security;

-- Lectura pública (para que Hero.jsx pueda leer sin auth)
create policy "Public can read site_settings"
  on site_settings for select
  using (true);

-- Solo usuarios autenticados pueden modificar
create policy "Auth users can update site_settings"
  on site_settings for update
  using (auth.role() = 'authenticated');

create policy "Auth users can insert site_settings"
  on site_settings for insert
  with check (auth.role() = 'authenticated');

-- ══════════════════════════════════════════════════════
--  STORAGE BUCKET: profile-assets
--  Ve a Supabase > Storage > New Bucket:
--    Name: profile-assets
--    Public: YES (toggle activado)
--
--  Luego ejecuta estas policies:
-- ══════════════════════════════════════════════════════

-- Lectura pública del bucket
insert into storage.buckets (id, name, public)
values ('profile-assets', 'profile-assets', true)
on conflict (id) do nothing;

-- Policy: lectura pública
create policy "Public read profile-assets"
  on storage.objects for select
  using (bucket_id = 'profile-assets');

-- Policy: solo autenticados pueden subir
create policy "Auth upload profile-assets"
  on storage.objects for insert
  with check (
    bucket_id = 'profile-assets'
    and auth.role() = 'authenticated'
  );

-- Policy: solo autenticados pueden eliminar
create policy "Auth delete profile-assets"
  on storage.objects for delete
  using (
    bucket_id = 'profile-assets'
    and auth.role() = 'authenticated'
  );

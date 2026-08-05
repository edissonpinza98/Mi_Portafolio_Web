-- ══════════════════════════════════════════════════════
--  CONTACT SETTINGS — gestión de contacto desde Admin
--  Ejecuta esto en Supabase > SQL Editor
-- ══════════════════════════════════════════════════════

-- La tabla site_settings ya existe (creada en supabase_profile_photo.sql)
-- Solo agregamos las filas de contacto:

INSERT INTO site_settings (key, value) VALUES
  ('whatsapp_number',  '573025366119'),
  ('whatsapp_link',    'https://wa.link/y26h7a'),
  ('email',            'edizonpinza@gmail.com'),
  ('github_url',       'https://github.com/edissonpinza98'),
  ('linkedin_url',     'https://www.linkedin.com/in/edisson-pinza-613160249'),
  ('facebook_url',     'https://www.facebook.com/Dev.Edi98'),
  ('telegram_url',     'https://t.me/Dev_Edi'),
  ('github_username',  '@edissonpinza98'),
  ('telegram_username','@Dev_Edi'),
  ('facebook_page',    'Dev.Edi98')
ON CONFLICT (key) DO NOTHING;

-- Si la tabla site_settings NO existe aún, créala primero:
-- (descomenta si no corriste supabase_profile_photo.sql antes)

-- CREATE TABLE IF NOT EXISTS site_settings (
--   key        text primary key,
--   value      text,
--   updated_at timestamptz default now()
-- );
-- ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public can read site_settings"
--   ON site_settings FOR SELECT USING (true);
-- CREATE POLICY "Auth users can update site_settings"
--   ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
-- CREATE POLICY "Auth users can insert site_settings"
--   ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

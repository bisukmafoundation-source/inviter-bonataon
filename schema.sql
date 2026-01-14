-- Membuat tabel untuk menyimpan data undangan
CREATE TABLE public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Memberikan hak akses dasar pada tabel 'invitations'
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.invitations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.invitations TO authenticated;

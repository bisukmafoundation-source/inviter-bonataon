-- Membuat tabel untuk menyimpan data undangan
CREATE TABLE invitations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Penjelasan Kolom:
-- id: Unique identifier untuk setiap undangan (Primary Key). Tipe UUID.
-- name: Nama tamu yang diundang. Tidak boleh kosong.
-- link: Link unik untuk undangan digital tamu. Tidak boleh kosong.
-- created_at: Timestamp kapan data undangan dibuat. Otomatis diisi.

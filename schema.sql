-- Buat tabel untuk menyimpan data undangan
create table
  public.invitations (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name text not null,
    link text not null,
    constraint invitations_pkey primary key (id)
  );

-- Aktifkan Row Level Security (RLS)
alter table public.invitations enable row level security;

-- Buat policy agar semua pengguna (anonim dan terotentikasi) bisa membaca semua data
create policy "Public invitations are viewable by everyone." on public.invitations
as permissive for select
to public
using (true);

-- Buat policy agar semua pengguna (anonim dan terotentikasi) bisa menambah data
create policy "Users can insert their own invitations." on public.invitations
as permissive for insert
to public
with check (true);

-- Buat policy agar semua pengguna (anonim dan terotentikasi) bisa menghapus data
create policy "Users can delete their own invitations." on public.invitations
as permissive for delete
to public
using (true);


"use client";

import { useState, useEffect, useCallback } from "react";
import { InvitationForm } from "@/components/invitation-form";
import { InvitationList } from "@/components/invitation-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Invitation } from "@/lib/types";
import { Search } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

export default function Home() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    // Inisialisasi Supabase client hanya di sisi klien
    // untuk memastikan environment variables sudah tersedia.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      setSupabase(createClient());
    } else {
      setError("Kredensial Supabase tidak ditemukan. Silakan atur di file .env.local atau di pengaturan environment Vercel.");
      setLoading(false);
    }
  }, []);

  const fetchInvitations = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("invitations")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }
      
      setInvitations(data || []);
    } catch (err: any) {
      console.error("Error fetching invitations:", err);
      setError("Gagal memuat data dari Supabase. Pastikan koneksi dan kredensial sudah benar, dan tabel 'invitations' sudah dibuat.");
      setInvitations([]);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (supabase) {
      fetchInvitations();
    }
  }, [supabase, fetchInvitations]);

  const addInvitation = async (newInvitation: { name: string; link: string }) => {
     if (!supabase) return;
    const { data, error: insertError } = await supabase
      .from("invitations")
      .insert([newInvitation])
      .select();

    if (insertError) {
      console.error("Error adding invitation:", insertError);
      setError("Gagal menambahkan undangan.");
    } else if (data) {
      setInvitations((prev) => [data[0], ...prev]);
    }
  };

  const deleteInvitation = async (id: string) => {
    if (!supabase) return;
    const { error: deleteError } = await supabase.from("invitations").delete().match({ id });

    if (deleteError) {
      console.error("Error deleting invitation:", deleteError);
      setError("Gagal menghapus undangan.");
    } else {
      setInvitations((prev) => prev.filter((invite) => invite.id !== id));
    }
  };
  
  const deleteAllInvitations = async () => {
    if (!supabase) return;
    setError(null);
    const allIds = invitations.map(i => i.id);
    const { error: deleteAllError } = await supabase.from('invitations').delete().in('id', allIds);

    if (deleteAllError) {
      console.error("Error deleting all invitations:", deleteAllError);
      setError("Gagal menghapus semua undangan. Cek RLS policy di Supabase.");
    } else {
       setInvitations([]);
    }
  };

  const filteredInvitations = invitations.filter((invitation) =>
    invitation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container mx-auto flex min-h-screen max-w-2xl flex-col items-center gap-8 p-4 sm:p-8">
      <div className="flex w-full flex-col items-center justify-center space-y-2 text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          WA Invitation Sender
        </h1>
        <p className="max-w-md text-muted-foreground">
          Buat dan kirim undangan personal melalui WhatsApp dengan mudah dan cepat.
        </p>
      </div>

      <div className="w-full space-y-6">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>Tambah Undangan</CardTitle>
          </CardHeader>
          <CardContent>
            <InvitationForm onAddInvitation={addInvitation} />
          </CardContent>
        </Card>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari nama undangan..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {error && <p className="text-destructive text-center">{error}</p>}
        
        {loading ? (
           <p className="text-center">Memuat data undangan...</p>
        ) : !supabase ? null : (
          <InvitationList 
            invitations={filteredInvitations} 
            onDeleteInvitation={deleteInvitation} 
            onDeleteAll={deleteAllInvitations}
          />
        )}
      </div>

      <footer className="w-full py-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WA Invitation Sender. Dibuat dengan ❤️.
        </p>
      </footer>
    </main>
  );
}

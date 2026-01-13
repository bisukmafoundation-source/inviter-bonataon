"use client";

import { useState, useEffect } from "react";
import { InvitationForm } from "@/components/invitation-form";
import { InvitationList } from "@/components/invitation-list";
import { useToast } from "@/hooks/use-toast";
import type { Invitation } from "@/lib/types";
import { Rocket } from "lucide-react";

export default function Home() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    try {
      const savedInvitations = localStorage.getItem('invitations');
      if (savedInvitations) {
        setInvitations(JSON.parse(savedInvitations));
      }
    } catch (error) {
      console.error("Failed to parse invitations from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('invitations', JSON.stringify(invitations));
    }
  }, [invitations, isClient]);

  const addInvitation = (data: { name: string; link: string }) => {
    const newInvitation: Invitation = { ...data, id: crypto.randomUUID() };
    setInvitations((prev) => [...prev, newInvitation]);
    toast({
      title: "Undangan Ditambahkan!",
      description: `Undangan untuk ${data.name} telah berhasil ditambahkan.`,
    });
  };

  const deleteInvitation = (id: string) => {
    const invitationToDelete = invitations.find(inv => inv.id === id);
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    toast({
      title: "Undangan Dihapus",
      description: `Undangan untuk ${invitationToDelete?.name} telah dihapus.`,
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto max-w-4xl py-8 px-4 md:py-12">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Rocket className="w-9 h-9 text-primary" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
              WA Invitation Sender
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Buat dan kirim undangan WhatsApp dengan mudah dan cepat.
          </p>
        </header>

        <div className="space-y-8">
          <InvitationForm onAddInvitation={addInvitation} />
          <InvitationList invitations={invitations} onDeleteInvitation={deleteInvitation} />
        </div>

        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Dibuat dengan ❤️ untuk kemudahan Anda.</p>
        </footer>
      </main>
    </div>
  );
}

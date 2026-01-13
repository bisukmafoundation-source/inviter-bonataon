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
      <main className="container mx-auto max-w-4xl px-4 py-6 md:py-10">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Rocket className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-headline font-bold">
              WA Invitation Sender
            </h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Buat dan kirim undangan WhatsApp dengan mudah.
          </p>
        </header>

        <div className="space-y-6">
          <InvitationForm onAddInvitation={addInvitation} />
          <InvitationList invitations={invitations} onDeleteInvitation={deleteInvitation} />
        </div>

        <footer className="text-center mt-10 text-sm text-muted-foreground">
          <p>Dibuat dengan ❤️ untuk kemudahan Anda.</p>
        </footer>
      </main>
    </div>
  );
}

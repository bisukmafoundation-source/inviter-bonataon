"use client";

import { useState, useEffect } from "react";
import { InvitationForm } from "@/components/invitation-form";
import { InvitationList } from "@/components/invitation-list";
import { useToast } from "@/hooks/use-toast";
import type { Invitation } from "@/lib/types";
import { Rocket, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    setInvitations((prev) => [newInvitation, ...prev]);
    toast({
      title: "Undangan Ditambahkan!",
      description: `Undangan untuk ${data.name} telah berhasil ditambahkan.`,
    });
    setIsFormOpen(false);
  };

  const deleteInvitation = (id: string) => {
    const invitationToDelete = invitations.find(inv => inv.id === id);
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    toast({
      variant: "destructive",
      title: "Undangan Dihapus",
      description: `Undangan untuk ${invitationToDelete?.name} telah dihapus.`,
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Rocket className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-headline font-bold">
              WA Invitation Sender
            </h1>
          </div>
          <p className="text-muted-foreground text-base">
            Buat dan kirim undangan WhatsApp dengan mudah.
          </p>
        </header>

        <div className="space-y-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
                <PlusCircle className="mr-2" />
                Tambah Undangan Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-headline">
                   <PlusCircle className="text-primary h-5 w-5" />
                   Tambah Undangan Baru
                </DialogTitle>
                <DialogDescription>
                  Isi nama dan link untuk ditambahkan ke daftar.
                </DialogDescription>
              </DialogHeader>
              <InvitationForm onAddInvitation={addInvitation} />
            </DialogContent>
          </Dialog>

          <InvitationList invitations={invitations} onDeleteInvitation={deleteInvitation} />
        </div>

        <footer className="text-center mt-10 text-sm text-muted-foreground">
          <p>Dibuat dengan ❤️ untuk kemudahan Anda.</p>
        </footer>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { InvitationForm } from "@/components/invitation-form";
import { InvitationList } from "@/components/invitation-list";
import { useToast } from "@/hooks/use-toast";
import type { Invitation } from "@/lib/types";
import { initialInvitations } from "@/lib/invitation-data";
import { Rocket, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    let savedInvitations: Invitation[] = [];
    try {
      const savedData = localStorage.getItem('invitations');
      if (savedData) {
        savedInvitations = JSON.parse(savedData);
      }
    } catch (error) {
      console.error("Failed to parse invitations from localStorage", error);
    }

    const initialIds = new Set(initialInvitations.map(i => i.id));
    const uniqueSaved = savedInvitations.filter(inv => !initialIds.has(inv.id));
    
    setInvitations([...initialInvitations, ...uniqueSaved]);

  }, []);

  useEffect(() => {
    if (isClient) {
      // Don't save the initial invitations to local storage, only user-added ones.
      const userAddedInvitations = invitations.filter(
        (inv) => !initialInvitations.some(initInv => initInv.id === inv.id)
      );
      localStorage.setItem('invitations', JSON.stringify(userAddedInvitations));
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

  const filteredInvitations = invitations.filter((invitation) =>
    invitation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  Isi nama untuk ditambahkan ke daftar. Link akan dibuat otomatis.
                </DialogDescription>
              </DialogHeader>
              <InvitationForm onAddInvitation={addInvitation} />
            </DialogContent>
          </Dialog>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari nama undangan..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <InvitationList invitations={filteredInvitations} onDeleteInvitation={deleteInvitation} />
        </div>

        <footer className="text-center mt-10 text-sm text-muted-foreground">
          <p>Dibuat dengan ❤️ untuk kemudahan Anda.</p>
        </footer>
      </main>
    </div>
  );
}

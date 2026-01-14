
"use client";

import { useState, useEffect } from "react";
import { InvitationForm } from "@/components/invitation-form";
import { InvitationList } from "@/components/invitation-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { initialInvitations } from "@/lib/invitation-data";
import type { Invitation } from "@/lib/types";
import { Search } from "lucide-react";

export default function Home() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedInvitations = localStorage.getItem("invitations");
    if (storedInvitations) {
      setInvitations(JSON.parse(storedInvitations));
    } else {
      setInvitations(initialInvitations);
    }
  }, []);

  useEffect(() => {
    if (invitations.length > 0) {
      localStorage.setItem("invitations", JSON.stringify(invitations));
    }
  }, [invitations]);

  const addInvitation = (newInvitation: { name: string; link: string }) => {
    setInvitations((prev) => [
      { id: crypto.randomUUID(), ...newInvitation },
      ...prev,
    ]);
  };

  const deleteInvitation = (id: string) => {
    setInvitations((prev) => prev.filter((invite) => invite.id !== id));
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

        <InvitationList invitations={filteredInvitations} onDeleteInvitation={deleteInvitation} />
      </div>

      <footer className="w-full py-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WA Invitation Sender. Dibuat dengan ❤️.
        </p>
      </footer>
    </main>
  );
}

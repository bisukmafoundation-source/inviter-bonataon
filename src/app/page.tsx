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

const initialInvitations: Invitation[] = [
  { "id": "f5f1c9c4-c1e9-4e1a-a1b7-6e4745e2a2c1", "name": "Pemilik Dapur Dairi", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Dairi" },
  { "id": "f8a0c2c1-d3e9-4a4b-8e11-6677f248e5a7", "name": "Pemilik Dapur Aek Natolu", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Aek%20Natolu" },
  { "id": "b3c9b7a1-d7e7-4c28-9d41-3b7c4f4d1e2e", "name": "Pemilik Dapur Siantar Narumonda", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Siantar%20Narumonda" },
  { "id": "e9c1d3a5-f8e1-4b1a-b6d3-2e4d4e3f8d4c", "name": "Pemilik Dapur Silait-lait", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Silait-lait" },
  { "id": "a9d8c7b6-c5e3-4f1a-b3d0-3e2c1f0e4d3c", "name": "Pemilik Dapur Debora", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Debora" },
  { "id": "c1d3e2f4-a5b6-4c7d-8e9f-1d2c3b4a5e6f", "name": "Pemilik Dapur Bisukma II", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Bisukma%20II" },
  { "id": "d4e5f6a7-b8c9-4d0e-a1b2-c3d4e5f6a7b8", "name": "Pemilik Dapur Bisukma I", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Bisukma%20I" },
  { "id": "e7f8a9b0-c1d2-4e3f-a4b5-c6d7e8f9a0b1", "name": "Pemilik Dapur Pagaran Emas", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Pagaran%20Emas" },
  { "id": "a0b1c2d3-e4f5-4a6b-b7c8-d9e0f1a2b3c4", "name": "Pemilik Dapur Sitabo-tabo", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Sitabo-tabo" },
  { "id": "b3c4d5e6-f7a8-4b9c-a0d1-e2f3a4b5c6d7", "name": "Pemilik Dapur Siatas Barita", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Siatas%20Barita" },
  { "id": "c6d7e8f9-a0b1-4c2d-b3e4-f5a6b7c8d9e0", "name": "Pemilik Dapur Pahae Julu", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Pahae%20Julu" },
  { "id": "d9e0f1a2-b3c4-4d5e-a6f7-b8c9d0e1f2a3", "name": "Pemilik Dapur Pahae Jae", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Pahae%20Jae" },
  { "id": "e2f3a4b5-c6d7-4e8f-a9b0-c1d2e3f4a5b6", "name": "Pemilik Dapur Simangumban", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Simangumban" },
  { "id": "f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9", "name": "Pemilik Dapur Garoga Sibargot", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Garoga%20Sibargot" },
  { "id": "a8b9c0d1-e2f3-4a4b-b5c6-d7e8f9a0b1c2", "name": "Pemilik Dapur Garoga Aek Tangga", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Garoga%20Aek%20Tangga" },
  { "id": "b1c2d3e4-f5a6-4b7c-a8d9-e0f1a2b3c4d5", "name": "Pemilik Dapur Pangaribuan Pakpahan", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Pangaribuan%20Pakpahan" },
  { "id": "c4d5e6f7-a8b9-4c0d-a1e2-f3a4b5c6d7e8", "name": "Pemilik Dapur Uluan", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Uluan" },
  { "id": "d7e8f9a0-b1c2-4d3e-a4f5-b6c7d8e9f0a1", "name": "Pemilik Dapur Bontul", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Bontul" },
  { "id": "e0f1a2b3-c4d5-4e6f-a7b8-c9d0e1f2a3b4", "name": "Pemilik Dapur Horas Toba", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Horas%20Toba" },
  { "id": "f3a4b5c6-d7e8-4f9a-a0b1-c2d3e4f5a6b7", "name": "Pemilik Dapur Sipoholon", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Pemilik%20Dapur%20Sipoholon" },
  { "id": "a6b7c8d9-e0f1-4a2b-b3c4-d5e6f7a8b9c0", "name": "Ketua PAC Gerindra Tapanuli Utara", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Ketua%20PAC%20Gerindra%20Tapanuli%20Utara" },
  { "id": "b9c0d1e2-f3a4-4b5c-a6d7-e8f9a0b1c2d3", "name": "Sekertaris PAC Gerindra Tapanuli Utara", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Sekertaris%20PAC%20Gerindra%20Tapanuli%20Utara" },
  { "id": "c2d3e4f5-a6b7-4c8d-a9e0-f1a2b3c4d5e6", "name": "Bendahara PAC Gerindra Tapanuli Utara", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Bendahara%20PAC%20Gerindra%20Tapanuli%20Utara" },
  { "id": "d5e6f7a8-b9c0-4d1e-a2f3-b4c5d6e7f8a9", "name": "Ketua PAC HKTI Tapanuli Utara", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Ketua%20PAC%20HKTI%20Tapanuli%20Utara" },
  { "id": "e8f9a0b1-c2d3-4e4f-a5b6-c7d8e9f0a1b2", "name": "Sekertaris PAC HKTI Tapanuli Utara", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Sekertaris%20PAC%20HKTI%20Tapanuli%20Utara" },
  { "id": "f1a2b3c4-d5e6-4f7a-a8b9-c0d1e2f3a4b5", "name": "Bendahara PAC HKTI Tapanuli Utara", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Bendahara%20PAC%20HKTI%20Tapanuli%20Utara" },
  { "id": "a4b5c6d7-e8f9-4a0b-a1c2-d3e4f5a6b7c8", "name": "Ketua Pemuda Katolik Tapanuli Utara", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Ketua%20Pemuda%20Katolik%20Tapanuli%20Utara" },
  { "id": "b7c8d9e0-f1a2-4b3c-a4d5-e6f7a8b9c0d1", "name": "Kadis Pendidikan", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Kadis%20Pendidikan" },
  { "id": "c0d1e2f3-a4b5-4c6d-a7e8-f9a0b1c2d3e4", "name": "Kadis Koperasi dan UMKM", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Kadis%20Koperasi%20dan%20UMKM" },
  { "id": "d3e4f5a6-b7c8-4d9e-a0f1-b2c3d4e5f6a7", "name": "Kadis Lingkungan Hidup Kabupaten Taput, Toba, Dairi dan Kotib Medan", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Kadis%20Lingkungan%20Hidup%20Kabupaten%20Taput,%20Toba,%20Dairi%20dan%20Kotib%20Medan" },
  { "id": "e6f7a8b9-c0d1-4e2f-a3b4-c5d6e7f8a9b0", "name": "Supplier SPPG Naungan Bisukma Group", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Supplier%20SPPG%20Naungan%20Bisukma%20Group" },
  { "id": "f9a0b1c2-d3e4-4f5a-a6b7-c8d9e0f1a2b3", "name": "Koperasi Tumbuh Bersama Petani", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Koperasi%20Tumbuh%20Bersama%20Petani" },
  { "id": "a2b3c4d5-e6f7-4a8b-a9c0-d1e2f3a4b5c6", "name": "Bank BRI Kantor Cabang Tarutung", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Bank%20BRI%20Kantor%20Cabang%20Tarutung" },
  { "id": "b5c6d7e8-f9a0-4b1c-a2d3-e4f5a6b7c8d9", "name": "Bank SUMUT Kantor Cabang Tarutung", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Bank%20SUMUT%20Kantor%20Cabang%20Tarutung" },
  { "id": "c8d9e0f1-a2b3-4c4d-a5e6-f7a8b9c0d1e2", "name": "Bank Mandiri KCP Tarutung", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Bank%20Mandiri%20KCP%20Tarutung" },
  { "id": "d1e2f3a4-b5c6-4d7e-a8f9-b0c1d2e3f4a5", "name": "Bank BNI KCP Tarutung", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Bank%20BNI%20KCP%20Tarutung" },
  { "id": "e4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8", "name": "Anggota DPC Partai Gerindra Tapanuli Utara (Tanpa Jabatan)", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Anggota%20DPC%20Partai%20Gerindra%20Tapanuli%20Utara" },
  { "id": "f7a8b9c0-d1e2-4f3a-a4b5-c6d7e8f9a0b1", "name": "Wakil Ketua Tuan Sahat Sibarani, S.E", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Ketua%20Tuan%20Sahat%20Sibarani,%20S.E" },
  { "id": "a0b1c2d3-e4f5-4a6b-a7c8-d9e0f1a2b3c4", "name": "Wakil Ketua Tuan Bonifasius Nurak Silalahi, S.Pd", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Ketua%20Tuan%20Bonifasius%20Nurak%20Silalahi,%20S.Pd" },
  { "id": "b3c4d5e6-f7a8-4b9c-a0d1-e2f3a4b5c6d7", "name": "Wakil Ketua Tuan Roy Suhartono Hutauruk, SIP", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Ketua%20Tuan%20Roy%20Suhartono%20Hutauruk,%20SIP" },
  { "id": "c6d7e8f9-a0b1-4c2d-a3e4-f5a6b7c8d9e0", "name": "Wakil Ketua Tuan Hendra Sipahutar", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Ketua%20Tuan%20Hendra%20Sipahutar" },
  { "id": "d9e0f1a2-b3c4-4d5e-a6f7-b8c9d0e1f2a3", "name": "Wakil Ketua Nyonya Meina Laosma Kristina Simanungkalit", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Ketua%20Nyonya%20Meina%20Laosma%20Kristina%20Simanungkalit" },
  { "id": "e2f3a4b5-c6d7-4e8f-a9b0-c1d2e3f4a5b6", "name": "Wakil Ketua Tuan Jefri Juandi Silitonga", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Ketua%20Tuan%20Jefri%20Juandi%20Silitonga" },
  { "id": "f5a6b7c8-d9e0-4f1a-a2c3-d4e5f6a7b8c9", "name": "Wakil Ketua Nyonya Ani Norita Hutabarat, S.Pd", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Ketua%20Nyonya%20Ani%20Norita%20Hutabarat,%20S.Pd" },
  { "id": "a8b9c0d1-e2f3-4a4b-a5c6-d7e8f9a0b1c2", "name": "Sekretaris Tuan Timmas Saut Parulian Sitompul, S.E", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Sekretaris%20Tuan%20Timmas%20Saut%20Parulian%20Sitompul,%20S.E" },
  { "id": "b1c2d3e4-f5a6-4b7c-a8d9-e0f1a2b3c4d5", "name": "Wakil Sekretaris Tuan Jefri Juandi Silitonga", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Tuan%20Jefri%20Juandi%20Silitonga" },
  { "id": "c4d5e6f7-a8b9-4c0d-a1e2-f3a4b5c6d7e8", "name": "Wakil Sekretaris Tuan Agustinus Sipayung", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Tuan%20Agustinus%20Sipayung" },
  { "id": "d7e8f9a0-b1c2-4d3e-a4f5-b6c7d8e9f0a1", "name": "Wakil Sekretaris Tuan Andi Tamarona Saing", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Tuan%20Andi%20Tamarona%20Saing" },
  { "id": "e0f1a2b3-c4d5-4e6f-a7b8-c9d0e1f2a3b4", "name": "Wakil Sekretaris Nyonya Lamtiurma Nababan", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Nyonya%20Lamtiurma%20Nababan" },
  { "id": "f3a4b5c6-d7e8-4f9a-a0b1-c2d3e4f5a6b7", "name": "Wakil Sekretaris Nona Masriana Sinaga", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Nona%20Masriana%20Sinaga" },
  { "id": "a6b7c8d9-e0f1-4a2b-a3c4-d5e6f7a8b9c0", "name": "Wakil Sekretaris Nona Jupika Sitompul", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Nona%20Jupika%20Sitompul" },
  { "id": "b9c0d1e2-f3a4-4b5c-a6d7-e8f9a0b1c2d3", "name": "Wakil Sekretaris Tuan Sahat Martupa Sibagariang", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Tuan%20Sahat%20Martupa%20Sibagariang" },
  { "id": "c2d3e4f5-a6b7-4c8d-a9e0-f1a2b3c4d5e6", "name": "Wakil Sekretaris Tuan Mian Tomos Sianipar", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Tuan%20Mian%20Tomos%20Sianipar" },
  { "id": "d5e6f7a8-b9c0-4d1e-a2f3-b4c5d6e7f8a9", "name": "Wakil Sekretaris Nona Lidia Wati Hutagalung", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Nona%20Lidia%20Wati%20Hutagalung" },
  { "id": "e8f9a0b1-c2d3-4e4f-a5b6-c7d8e9f0a1b2", "name": "Wakil Sekretaris Nyonya Erni Mesalina Hutauruk", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Sekretaris%20Nyonya%20Erni%20Mesalina%20Hutauruk" },
  { "id": "f1a2b3c4-d5e6-4f7a-a8b9-c0d1e2f3a4b5", "name": "Bendahara Nyonya Dermawan Sihotang", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Bendahara%20Nyonya%20Dermawan%20Sihotang" },
  { "id": "a4b5c6d7-e8f9-4a0b-b1c2-d3e4f5a6b7c8", "name": "Wakil Bendahara Nona Lia Finola Pasaribu, S.Pd", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Bendahara%20Nona%20Lia%20Finola%20Pasaribu,%20S.Pd" },
  { "id": "b7c8d9e0-f1a2-4b3c-b4d5-e6f7a8b9c0d1", "name": "Wakil Bendahara Nyonya Erni Sinaga", "link": "https://undangan-bonataon-bisukmagroup2026.vercel.app?to=Wakil%20Bendahara%20Nyonya%20Erni%20Sinaga" }
];


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
      } else {
        setInvitations(initialInvitations);
      }
    } catch (error) {
      console.error("Failed to parse invitations from localStorage", error);
      setInvitations(initialInvitations);
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

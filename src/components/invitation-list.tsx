"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Send, Trash2, List, Link as LinkIcon, UserX } from "lucide-react";
import type { Invitation } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface InvitationListProps {
  invitations: Invitation[];
  onDeleteInvitation: (id: string) => void;
}

export function InvitationList({ invitations, onDeleteInvitation }: InvitationListProps) {
  const handleSend = (name: string, link: string) => {
    const message = `Kepada Yth. Bapak/Ibu/Saudara/i ${name},\n\nDengan hormat, kami mengundang Anda ke acara kami.\n\nSilakan lihat undangan digital kami di sini:\n${link}\n\nAtas kehadiran dan do'a restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-headline">
          <List className="text-primary h-5 w-5" />
          Daftar Undangan
        </CardTitle>
        <CardDescription>
          Berikut adalah daftar undangan yang telah Anda buat.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {invitations.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Nama</TableHead>
                  <TableHead className="text-right font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell className="font-medium">{invite.name}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <a href={invite.link} target="_blank" rel="noopener noreferrer" className="inline-flex">
                        <Button variant="outline" size="icon" aria-label="Lihat Undangan">
                           <LinkIcon className="h-4 w-4" />
                         </Button>
                       </a>
                       <Button variant="outline" size="icon" onClick={() => handleSend(invite.name, invite.link)} aria-label="Kirim Undangan">
                         <Send className="h-4 w-4" />
                       </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive" size="icon" aria-label="Hapus Undangan">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini akan menghapus undangan untuk <span className="font-bold">{invite.name}</span> secara permanen. Anda tidak dapat mengurungkan tindakan ini.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteInvitation(invite.id)}>Hapus</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-2">
            <UserX className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground font-semibold text-lg">Belum ada undangan.</p>
            <p className="text-muted-foreground text-sm">Silakan tambahkan undangan baru di atas.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Send, Trash2, List, Link as LinkIcon, UserX, MoreVertical, Trash } from "lucide-react";
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
  onDeleteAll: () => void;
}

export function InvitationList({ invitations, onDeleteInvitation, onDeleteAll }: InvitationListProps) {
  const handleSend = (name: string, link: string) => {
    const message = `Kepada Yth. Bapak/Ibu/Saudara/i ${name},\n\nDengan hormat, dengan kerendahan hati kami mengundang bapak ibu untuk hadir di acara Bona Taon Bisukma Grup.\n\nSilakan lihat undangan digital kami di sini:\n${link}\n\nAtas kehadiran dan do'a restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl font-headline">
            <List className="text-primary h-5 w-5" />
            Daftar Undangan
          </CardTitle>
          <CardDescription>
            Total {invitations.length} undangan dalam daftar.
          </CardDescription>
        </div>
        {invitations.length > 0 && (
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash className="mr-2 h-4 w-4" />
                Hapus Semua
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin ingin menghapus semua undangan?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini akan menghapus semua ({invitations.length}) undangan secara permanen. Anda tidak dapat mengurungkan tindakan ini.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteAll}>Ya, Hapus Semua</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardHeader>
      <CardContent>
        {invitations.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Nama</TableHead>
                  <TableHead className="text-right font-semibold w-[150px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell className="font-medium pr-2">{invite.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" className="rounded-full h-8 px-3" onClick={() => handleSend(invite.name, invite.link)}>
                          <Send className="mr-1.5 h-3.5 w-3.5"/>
                          Kirim
                        </Button>
                        <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                               <DropdownMenuItem asChild>
                                 <a href={invite.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                                   <LinkIcon className="h-4 w-4" />
                                   <span>Lihat Undangan</span>
                                 </a>
                              </DropdownMenuItem>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                  <span>Hapus</span>
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>

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
                      </div>
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

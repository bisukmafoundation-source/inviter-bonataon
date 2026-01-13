"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus memiliki setidaknya 2 karakter." }),
  link: z.string().url({ message: "Harap masukkan URL undangan yang valid." }),
});

interface InvitationFormProps {
  onAddInvitation: (data: z.infer<typeof formSchema>) => void;
}

export function InvitationForm({ onAddInvitation }: InvitationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      link: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddInvitation(values);
    form.reset();
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <PlusCircle className="text-primary" />
          Tambah Undangan Baru
        </CardTitle>
        <CardDescription>
          Isi nama dan link undangan di bawah ini untuk menambahkannya ke daftar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Undangan</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Undangan Digital</FormLabel>
                  <FormControl>
                    <Input placeholder="https://undangan.online/contoh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah ke Daftar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

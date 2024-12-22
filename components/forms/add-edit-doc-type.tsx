"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(30),
  description: z.string().min(10).max(250),
});

export default function AddEditDocumentType(props: {
  documentType: Tables<"DocumentType">;
  setOpenState: (value: boolean) => void;
}) {
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.documentType.name ? props.documentType.name : "",
      description: props.documentType.description
        ? props.documentType.description
        : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (props.documentType.id) {
      const { data, error } = await supabase
        .from("DocumentType")
        .update({ name: values.name, description: values.description })
        .eq("id", props.documentType.id);

      form.reset();
      router.refresh();
    } else {
      const { data, error } = await supabase
        .from("DocumentType")
        .insert({ name: values.name, description: values.description });

      form.reset();
      router.refresh();
    }

    props.setOpenState(false);

    toast({
      title: "Success",
      description: "Document Type updated!"
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/database.types";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type TableNames = keyof Database['public']['Tables'];


type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
  tablename: TableNames;
  value: number;
  fieldname: string;
  setopenstate?: (value: boolean) => void;
};

export function DeleteButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const supabase = createClient()
  const { pending } = useFormStatus();
  const router = useRouter();
  

  async function deleteRecord(){

    const {data, error} = await supabase.from(props.tablename).delete().eq(props.fieldname, props.value);

    if(error){
      toast({
        title: "Failure",
        description: "Document Type couldn't be deleted!"
      })
    }

    if(props.setopenstate){
      props.setopenstate(false)
    }

    router.refresh();
  }

  return (
    <Button variant={"destructive"} onClick={deleteRecord} type="button" aria-disabled={pending}>
      {pending ? pendingText : children}
    </Button>
  );
}

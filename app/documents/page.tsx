import DocumentIndex from "@/components/forms/document-index";
import { DataTable } from "@/components/tables/documents/data-table";
import DocumentsGrid from "@/components/tables/documents/document-grid";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <DocumentsGrid />
    </div>
  );
}

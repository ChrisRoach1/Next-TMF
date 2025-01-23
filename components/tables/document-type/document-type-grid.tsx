'use server';

import { createClient } from "@/utils/supabase/server"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function DocumenTypeGrid() {
  const supabase = await createClient();
  const documentTypes = (await supabase.from("DocumentType").select().order("id")).data ?? [];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={documentTypes} />
    </div>
  )
}

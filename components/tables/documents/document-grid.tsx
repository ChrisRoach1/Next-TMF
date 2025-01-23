'use server';

import { createClient } from "@/utils/supabase/server"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Tables } from "@/database.types";
import { QueryData } from "@supabase/supabase-js";
import { documentWithDocTypeQuery } from "./queries";



export default async function DocumentsGrid() {
  const supabase = await createClient();
  
  const documents = (await documentWithDocTypeQuery).data ?? [];
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={documents} />
    </div>
  )
}

import { createClient } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
const supabase = createClient();

export const documentWithDocTypeQuery = supabase.from('TMFDocument').select(`*, document_type:document_typeId(name)`).order("id")
export type documentsWithDoctypes = QueryData<typeof documentWithDocTypeQuery>;

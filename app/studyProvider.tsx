'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { Toaster } from "@/components/ui/toaster"

type contextType = {
  study: Tables<'Study'> | null,
  getStudy: () => Promise<void>
} | null

export const studyContext = createContext<contextType>(null);

export const useStudy = () => useContext(studyContext);

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient()
  const [study, setStudy] = useState<Tables<'Study'> | null>(null)
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() =>{
    console.log('inside provider')
    getStudy()
  }, [])

  async function getStudy(){
    var {data, error} = await supabase.from('Study').select()
    setStudy(data !== null ? data[0] : null)
  }


  return (
    <studyContext.Provider value={{ study, getStudy }}>
      {children}
      <Toaster />
    </studyContext.Provider>
  );
}
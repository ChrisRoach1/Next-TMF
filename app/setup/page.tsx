'use server';

import ProjectIdUpdate from "@/components/forms/projectId-update";
import DocumenTypeGrid from "@/components/tables/document-type/document-type-grid";

export default async function SetupPage() {
  return (
    <>
    <ProjectIdUpdate/>
    <DocumenTypeGrid />
    </>
  )

}
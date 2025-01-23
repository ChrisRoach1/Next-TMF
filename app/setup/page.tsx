'use server';

import ProjectIdUpdate from "@/components/forms/projectId-update";
import DocumenTypeGrid from "@/components/tables/document-type/document-type-grid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function SetupPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Study Setup</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your study configuration and document types.
          </p>
        </div>
        
        <div className="mt-6 md:mt-8 space-y-6 md:space-y-8 grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Project Settings</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Update your study&apos;s project identifier and basic information.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <ProjectIdUpdate />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Document Types</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Manage the document types available in your study.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <DocumenTypeGrid />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

}
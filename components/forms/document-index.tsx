"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileIcon, XIcon, UploadCloudIcon, CalendarIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { createClient } from "@/utils/supabase/client"
import { useState, useCallback, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tables } from "@/database.types"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function DocumentIndex() {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null)
  const [documentTypes, setDocumentTypes] =  useState<Tables<"DocumentType">[] | null>(null)
  const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('DocumentType').select()
            setDocumentTypes(data)
        }
        getData()
    }, [])

  const formSchema = z.object({
    documentTypeId: z.string(),
    documentNotes: z.string().max(500),
    version: z.string().max(5),
    documentDate: z.date(),
    tags: z.string().max(50)
  });

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        documentTypeId: undefined,
        documentNotes: "",
        version: "",
        documentDate: undefined,
        tags: ""
      },
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(file){

      console.log(values)
      const fileName = file.name;
      const filePath = `documents/${file.name}`;
      supabase.storage.from('TMFDocuments').upload(filePath, file)

      const { data, error } = await supabase
      .from("TMFDocument")
      .insert({ 
        file_name: fileName, 
        file_path: filePath, 
        document_typeId: parseInt(values.documentTypeId), 
        document_notes: values.documentNotes, 
        version: values.version, 
        document_date: values.documentDate.toDateString(), 
        tags: values.tags });
  
    form.reset();
    router.refresh();
    removeFile();

      toast({
        title: "Success",
        description: "Successfully Indexed!"
      })
    }
  }    

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024
  })

  const removeFile = () => {
    supabase.storage.from('TMFDocuments').remove([`documents/${file?.name}`])
    setFile(null)
  }

  return (
    <div className="container max-w-7xl py-10">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl">Document Upload</CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-[500px]">
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`h-[400px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-4 transition-colors duration-300 ${
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="text-center space-y-4">
                  <FileIcon size={64} className="mx-auto text-primary" />
                  <p className="text-xl font-semibold text-primary">
                    {file.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    <XIcon className="mr-2 h-4 w-4" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <UploadCloudIcon
                    size={64}
                    className="mx-auto text-muted-foreground"
                  />
                  <div>
                    <p className="text-xl font-semibold">Drop your file here</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse (PDF only, max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="documentTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Document Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                          {documentTypes?.map((docType) => {
                                return (
                                  <SelectItem
                                    key={docType.id}
                                    value={docType.id.toString()}
                                  >
                                    {docType.name}
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="documentNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            placeholder="Document Notes"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="version"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Version</FormLabel>
                          <FormControl>
                            <Input placeholder="Version" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="documentDate"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Document Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[210px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="Tags" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


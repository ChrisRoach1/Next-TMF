"use client";

import { DeleteButton } from "@/components/delete-button";
import AddEditDocumentType from "@/components/forms/add-edit-doc-type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/database.types";
import { ColumnDef, Table } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { documentsWithDoctypes } from "./queries";

type WithRelations<T, R> = T & R

export const columns: ColumnDef<documentsWithDoctypes[0]>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">ID</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "file_name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("file_name")}</div>
      );
    },
  },
  {
    accessorKey: "document_type",
    header: () => <div className="">Document Type</div>,
    cell: ({ row }) => {
      console.log(row)
      console.log(row.original)
      let docType = row.original.document_type
      return (
        <div className="text-left font-medium">
          {docType.name}
        </div>
      );
    },
  },
  {
    accessorKey: "version",
    header: () => <div className="">Version</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("version")}
        </div>
      );
    },
  },
  {
    accessorKey: "document_date",
    header: () => <div className="">Document Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("document_date")}
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    header: () => <div className="">Tags</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("tags")}
        </div>
      );
    },
  },
  {
    accessorKey: "document_notes",
    header: () => <div className="">Notes</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("document_notes")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DialogTrigger asChild>
                <DropdownMenuItem >Edit</DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
              <DropdownMenuItem >Delete</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                </DialogHeader>
            </DialogContent>

        </Dialog>
      );
    },
  },
];

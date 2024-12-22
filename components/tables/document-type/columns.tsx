"use client";

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
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const columns: ColumnDef<Tables<"DocumentType">>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">ID</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("name")}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="">Description</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const documentType = row.original;
      let modalType: string = "edit";
      const [open, setOpen] = useState(false);

      function setModalType(value: string) {
        modalType = value;
      }

      function setOpenState(value: boolean){
        setOpen(value)
      }

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
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            {modalType === "edit" ? (
              <>
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to
                    permanently delete this file from our servers?
                  </DialogDescription>
                </DialogHeader>
                <AddEditDocumentType documentType={documentType} setOpenState={setOpenState} />
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Delete?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to
                    permanently delete this file from our servers?
                  </DialogDescription>
                </DialogHeader>
                <AddEditDocumentType documentType={documentType} setOpenState={setOpenState} />
              </>            )}
          </DialogContent>
        </Dialog>
      );
    },
  },
];

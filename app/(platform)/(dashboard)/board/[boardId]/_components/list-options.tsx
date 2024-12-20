"use client";

import { ElementRef, useRef } from "react";
import { List } from "@prisma/client";
import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FormSubmit } from "@/components/form/form-submit";
import { deleteList } from "@/actions/delete-list";
import { copyList } from "@/actions/copy-list";
import { useAction } from "@/hooks/use-action";

type ListOptionsProps = {
  data: List;
  onAddCard: () => void;
};

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button asChild className="size-auto p-2" variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-center text-sm font-medium text-neutral-600">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input
            type="hidden"
            name="id"
            id="id"
            value={data.id}
            hidden
            aria-hidden
          />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={data.boardId}
            hidden
            aria-hidden
          />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>

        <Separator />

        <form action={onDelete}>
          <input
            type="hidden"
            name="id"
            id="id"
            value={data.id}
            hidden
            aria-hidden
          />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={data.boardId}
            hidden
            aria-hidden
          />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            variant="ghost"
          >
            Delete this list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

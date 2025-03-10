"use client";

import { useState, useRef, ElementRef } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { List } from "@prisma/client";

import { FormInput } from "@/components/form/form-input";
import { ListOptions } from "./list-options";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";

type ListHeaderProps = {
  data: List;
  onAddCard: () => void;
};

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) return disableEditing();

    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input
            type="hidden"
            id="id"
            name="id"
            value={data.id}
            hidden
            aria-hidden
          />
          <input
            type="hidden"
            id="boardId"
            name="boardId"
            value={data.boardId}
            hidden
            aria-hidden
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />
          <button type="button" hidden aria-disabled />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full cursor-text border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {data.title}
        </div>
      )}

      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};

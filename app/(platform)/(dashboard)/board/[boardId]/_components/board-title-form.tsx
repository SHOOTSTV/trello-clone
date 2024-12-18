"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { Board } from "@prisma/client";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Button } from "@/components/ui/button";

import { FormInput } from "@/components/form/form-input";

import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated.`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

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

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get("title") as string;

    if (title !== newTitle && newTitle.length > 3) {
      execute({
        title: newTitle,
        id: data.id,
      });
    } else {
      disableEditing();
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          placeholder="Board title:"
          onBlur={onBlur}
          defaultValue={title}
          className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold placeholder:text-white/60 focus-visible:!outline-none focus-visible:!ring-transparent focus-visible:!ring-offset-0"
        />
      </form>
    );
  } else {
    return (
      <Button
        onClick={enableEditing}
        variant="transparent"
        className="size-auto p-1 px-2 text-lg font-bold"
      >
        {title}
      </Button>
    );
  }
};

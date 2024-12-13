"use client";

import type { ListWithCards } from "@/types";
import { ListForm } from "./list-form";

type ListContainerProps = {
  data: ListWithCards[];
  boardId: string;
};

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div aria-hidden className="w-1 shrink-0" />
    </ol>
  );
};

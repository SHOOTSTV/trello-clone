"use client";

import type { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

type ListContainerProps = {
  data: ListWithCards[];
  boardId: string;
};

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex h-full gap-x-3">
      {orderedData.map((list, i) => (
        <ListItem key={list.id} index={i} data={list} />
      ))}
      <ListForm />
      <div aria-hidden className="w-1 shrink-0" />
    </ol>
  );
};

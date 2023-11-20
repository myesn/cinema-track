"use client";

import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import CinemalListItem from "./CinemaListItem";
import { CinemaDto } from "@/types/dto";
import { PostgrestError } from "@supabase/supabase-js";

export default function CinemaList(props: CinemaListProps) {
  if (props.loading) {
    return <p>loading..</p>;
  }

  if (props.error) {
    return <p>{props.error.message}</p>;
  }

  if (!props.items.length) {
    return (
      <>
        {props.keyword && (
          <p className="mb-1">没有找到 &quot;{props.keyword}&quot; 请添加</p>
        )}
      </>
    );
  }

  return (
    <ScrollShadow className="w-full h-96">
      <Listbox aria-label="cinema list">
        {props.items.map((item) => (
          <ListboxItem key={item.name} textValue={item.name}>
            <CinemalListItem
              cinema={item}
              showActions={props.showActions}
              onAction={props.onItemAction}
            />
          </ListboxItem>
        ))}
      </Listbox>
    </ScrollShadow>
  );
}

export interface CinemaListProps {
  loading: boolean;
  upserting: boolean;
  error: PostgrestError | null;
  keyword: string | null;
  showActions: boolean;
  items: CinemaDto[];

  onItemAction: (action: string, cinema: CinemaDto) => Promise<void>;
}

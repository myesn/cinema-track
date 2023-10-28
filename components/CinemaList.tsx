"use client";

import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import CinemalListItem from "./CinemaListItem";
import CinemaUpsertDialog from "./CinemaUpsertCard";
import { CinemaDto } from "@/types/dto";
import { PostgrestError } from "@supabase/supabase-js";
import { CinemaUpsertForm } from "@/app/page";

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
          <p className="mb-1">没有看过 &quot;{props.keyword}&quot;，请添加：</p>
        )}
        <CinemaUpsertDialog
          upserting={props.upserting}
          defaultValue={{ name: props.keyword ?? "" }}
          onUpsert={props.onUpsert}
        />
      </>
    );
  }

  return (
    <>
      {props.upsertForm?.name && (
        <CinemaUpsertDialog
          upserting={props.upserting}
          defaultValue={props.upsertForm}
          onUpsert={props.onUpsert}
        />
      )}
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
    </>
  );
}

export interface CinemaListProps {
  loading: boolean;
  upserting: boolean;
  error: PostgrestError | null;
  keyword: string | null;
  showActions: boolean;
  items: CinemaDto[];
  upsertForm: CinemaUpsertForm | null;

  onItemAction: (action: string, cinema: CinemaDto) => Promise<void>;
  onUpsert: (form: CinemaUpsertForm) => Promise<void>;
}

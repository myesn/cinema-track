"use client";

import { Input, Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import supabase from "@/supabse";
import CinemalListItem from "./CinemaListItem";
import CinemaUpsertDialog, { CinemaUpsertForm } from "./CinemaUpsertCard";
import { CinemaDto } from "@/types/dto";
import { PostgrestError } from "@supabase/supabase-js";

export default function CinemaList() {
  const [keyword, setKeyword] = useState("");
  const { isLoading, cinemas, error, remove } = useCinema({ keyword });
  if (isLoading) {
    return <p>loading..</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const SearchInput = (
    <Input
      placeholder="Search..."
      className="mb-5"
      isClearable
      onChange={handleSearchInputChange}
      onClear={handleSearchInputClear}
    />
  );

  if (!cinemas.length) {
    return (
      <>
        {SearchInput}
        <p className="mb-1">没有看过 &quot;{keyword}&quot;，请添加：</p>
        <CinemaUpsertDialog
          defaultValue={{ name: keyword }}
          onUpsertOk={handleUpsertOk}
        />
      </>
    );
  }

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement> | null) {
    const value = e?.target?.value?.toLowerCase();

    setKeyword(value ?? "");
  }

  function handleSearchInputClear() {
    setKeyword("");
  }

  async function handleUpsertOk() {
    // await fetchItems();
  }

  async function handleCinemaAction(cinema: CinemaDto, action: string) {
    console.log(cinema, action);
    if (action === "edit") {
      alert("not implemented");
    } else if (action === "delete") {
      await remove(cinema.id);
    }
  }

  return (
    <>
      {SearchInput}

      <ScrollShadow className="w-full h-96">
        <Listbox aria-label="cinema list">
          {cinemas.map((cinema) => (
            <ListboxItem key={cinema.name} textValue={cinema.name}>
              <CinemalListItem cinema={cinema} onAction={handleCinemaAction} />
            </ListboxItem>
          ))}
        </Listbox>
      </ScrollShadow>
    </>
  );
}

export function useCinema(props: useCinemaProps) {
  const [cinemas, setCinemas] = useState<CinemaDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  let filteredCinemas: CinemaDto[] = [...cinemas];

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const { data, error } = await supabase()
        .from("cinemas")
        .select()
        .order("updated_at", { ascending: false });

      if (error) {
        setError(error);
      }

      if (!error && data) {
        const items: CinemaDto[] = data.map((x) => ({
          id: x.id,
          name: x.name,
          remarks: x.remarks ?? "",
          updated: new Date(x.updated_at).toLocaleDateString(),
        }));

        setCinemas([...items]);
      }

      setIsLoading(false);
    })();
  }, []);

  if (props.keyword) {
    filteredCinemas = [
      ...cinemas.filter((x) => x.name.toLowerCase().includes(props.keyword!)),
    ];
  }

  async function remove(id: number) {
    if (!id) return;

    setIsLoading(true);

    const { error } = await supabase().from("cinemas").delete().eq("id", id);
    if (error) {
      setError(error);
    } else {
      setCinemas((items) => [...items.filter((x) => x.id !== id)]);
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    cinemas: filteredCinemas,
    error,

    remove,
  };
}

interface useCinemaProps {
  keyword?: string;
}

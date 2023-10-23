"use client";

import {
  Input,
  Listbox,
  ListboxItem,
  ScrollShadow
} from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import supabase from "@/supabse";
import CinemalListItem from "./CinemaListItem";
import CinemaUpsertDialog, { CinemaUpsertForm } from "./CinemaUpsertCard";
import { CinemaDto } from "@/types/dto";

export default function CinemaList() {
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<CinemaDto[]>([]);
  const [filteredItems, setFilteredItems] = useState<CinemaDto[]>([...items]);

  const [dialogDefaultValue, setDialogDefaultValue] =
    useState<CinemaUpsertForm>();
  const hasItems = !isLoading && filteredItems.length > 0;

  async function fetchItems() {
    const { data, error } = await supabase()
      .from("cinemas")
      .select()
      .order("updated_at", { ascending: false });
    if (!error && data) {
      const items: CinemaDto[] = data.map((x) => ({
        id: x.id,
        name: x.name,
        remarks: x.remarks ?? "",
        updated: new Date(x.updated_at).toLocaleDateString(),
      }));

      setItems([...items]);
      setFilteredItems([
        ...items.filter((x) => x.name.toLowerCase().includes(keyword)),
      ]);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement> | null) {
    const value = e?.target?.value?.toLowerCase();

    setKeyword(value ?? "");
    setDialogDefaultValue((x) => ({ ...x, name: value }));

    if (!value) {
      setFilteredItems([...items]);
      return;
    }

    setFilteredItems([
      ...items.filter((x) => x.name.toLowerCase().includes(value)),
    ]);
  }

  function handleSearchInputClear() {
    setFilteredItems([...items]);
  }

  async function handleUpsertOk() {
    await fetchItems();
  }

  return (
    <>
      <Input
        placeholder="Search..."
        className="mb-5"
        isClearable
        onChange={handleSearchInputChange}
        onClear={handleSearchInputClear}
      />

      {isLoading && <p>loading..</p>}

      {hasItems && (
        <ScrollShadow className="w-full h-96">
          <Listbox aria-label="cinema list">
            {filteredItems.map((item) => (
              <ListboxItem key={item.name} textValue={item.name}>
                <CinemalListItem {...item} />
              </ListboxItem>
            ))}
          </Listbox>
        </ScrollShadow>
      )}

      {!hasItems && (
        <>
          <p className="mb-1">没有看过 &quot;{keyword}&quot;，请添加：</p>
          <CinemaUpsertDialog
            defaultValue={dialogDefaultValue}
            onUpsertOk={handleUpsertOk}
          />
        </>
      )}
    </>
  );
}

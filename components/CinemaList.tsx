"use client";

import { List, ListItem, Text, TextInput } from "@tremor/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useEffect, useState } from "react";
import supabase from "@/supabse";
import CinemalListItem from "./CinemaListItem";
import CinemaUpsertDialog, { CinemaUpsertForm } from "./CinemaUpsertDialog";
import { CinemaDto } from "@/types/dto";

export default () => {
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

  async function handleUpsertOk() {
    await fetchItems();
  }

  return (
    <>
      <TextInput
        icon={MagnifyingGlassIcon}
        placeholder="Search..."
        className="mb-5"
        onChange={handleSearchInputChange}
      />

      {isLoading && <Text>loading..</Text>}

      {hasItems && (
        <List>
          {filteredItems.map((item) => (
            <ListItem key={item.name}>
              <CinemalListItem {...item} />
            </ListItem>
          ))}
        </List>
      )}

      {!hasItems && (
        <>
          <Text className="mb-1">没有看过 "{keyword}"，请添加：</Text>
          <CinemaUpsertDialog
            defaultValue={dialogDefaultValue}
            onUpsertOk={handleUpsertOk}
          />
        </>
      )}
    </>
  );
};

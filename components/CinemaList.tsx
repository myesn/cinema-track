"use client";

import { List, ListItem, Text, TextInput } from "@tremor/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useEffect, useState } from "react";
import supabase from "@/supabse";
import CinemalListItem from "./CinemaListItem";
import CinemaAddOrUpdateDialog, {
  CinemaAddOrUpdateForm,
} from "./CinemaAddOrUpdateDialog";
import { CinemaDto } from "@/types/dto";

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<CinemaDto[]>([]);
  const [filteredItems, setFilteredItems] = useState<CinemaDto[]>([...items]);

  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const [dialogDefaultValue, setDialogDefaultValue] =
    useState<CinemaAddOrUpdateForm>();
  const hasItems = !isLoading && filteredItems.length > 0;

  async function fetchItems() {
    try {
      const { data, error } = await supabase()
        .from("cinemas")
        .select()
        .order("updated_at", { ascending: false });
      if (!error && data) {
        const items: CinemaDto[] = data.map((x) => ({
          id: x.id,
          name: x.name,
          remarks: x.remarks,
          updated: new Date(x.updated_at).toLocaleDateString(),
        }));

        setItems([...items]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    handleSearchInputChange(null);
  }, [items]);

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement> | null) {
    const value = e?.target?.value?.toLowerCase();

    setKeyword(value ?? "");
    setDialogDefaultValue((x) => ({ ...x, name: keyword }));

    if (!value) {
      setFilteredItems([...items]);
      return;
    }

    setFilteredItems([
      ...items.filter((x) => x.name.toLowerCase().includes(value)),
    ]);
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
        <Text>
          没有看过 "{keyword}"，请添加
          {/* <Bold
            className="underline cursor-pointer"
            onClick={() => setIsOpenDialog(true)}
          >
            点击添加
          </Bold> */}
        </Text>
      )}

      {!hasItems && (
        <CinemaAddOrUpdateDialog defaultValue={dialogDefaultValue} />
      )}
    </>
  );
};

import { CinemaUpsertForm } from "@/components/cinema-manage/cinema-upsert";
import supabase from "@/supabse";
import { CinemaDto } from "@/types/cinema.dto";
import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";

export function useCinemaClient() {
  const [items, setItems] = useState<CinemaDto[]>([]);

  const [listing, setListing] = useState(true);
  const [upserting, setUpserting] = useState(false);
  const [removing, setRemoving] = useState(false);

  const [listError, setListError] = useState<PostgrestError | null>(null);
  const [upsertError, setUpsertError] = useState<PostgrestError | null>(null);
  const [removeError, setRemoveError] = useState<PostgrestError | null>(null);

  let filteredItems: CinemaDto[] = [...items];

  // 立即执行
  // useEffect(() => {
  //   (async () => {

  //   })();
  // }, []);

  // if (props.keyword) {
  //   filteredCinemas = [
  //     ...cinemas.filter((x) => x.name.toLowerCase().includes(props.keyword!)),
  //   ];
  // }

  async function list() {
    setListing(true);
    setListError(null);

    const { data, error } = await supabase()
      .from("cinemas")
      .select()
      .order("updated_at", { ascending: false });

    if (error) {
      setListError(error);
    }

    if (!error && data) {
      const items: CinemaDto[] = data.map((x) => ({
        id: x.id,
        name: x.name,
        remarks: x.remarks ?? "",
        updated: new Date(x.updated_at).toLocaleDateString(),
      }));

      setItems([...items]);
    }

    setListing(false);
  }

  async function remove(id: number) {
    if (!id) return;

    setRemoving(true);

    const { error } = await supabase().from("cinemas").delete().eq("id", id);
    if (error) {
      setRemoveError(error);
    } else {
      setItems((items) => [...items.filter((x) => x.id !== id)]);
    }

    setRemoving(false);
  }

  async function upsert(userId: string, form: CinemaUpsertForm) {
    setUpserting(true);
    setUpsertError(null);

    const { data, error } = await supabase()
      .from("cinemas")
      .upsert({
        id: form.id ?? undefined,
        name: form.name!,
        remarks: form.remarks ?? undefined,
        updated_at: new Date().toISOString(),
        creator_id: userId,
      })
      .select();

    if (error?.message) {
      setUpsertError(error);
      return;
    }

    const [item] = data as { id: number }[];
    const relations = form.tagIds?.map((tagId) => ({
      cinema_id: item.id,
      tag_id: tagId,
      creator_id: userId,
    }));
    if (relations && relations.length) {
      await supabase().from("cinemas_tags").insert(relations);
    }

    setUpserting(false);
  }

  return {
    items: filteredItems,

    listing,
    listError,    
    list,

    upserting,
    upsertError,
    upsert,

    removing,
    removeError,
    remove,
  };
}

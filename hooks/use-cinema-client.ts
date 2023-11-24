import { CinemaUpsertForm } from "@/components/cinema-manage/cinema-upsert";
import supabase from "@/supabse";
import { CinemaDto } from "@/types/cinema.dto";
import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";

export function useCinemaClient() {
  const [items, setItems] = useState<CinemaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [upserting, setUpserting] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
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
    setLoading(true);

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

      setItems([...items]);
    }

    setLoading(false);
  }

  async function remove(id: number) {
    if (!id) return;

    setLoading(true);

    const { error } = await supabase().from("cinemas").delete().eq("id", id);
    if (error) {
      //setError(error);
      alert(error.message);
    } else {
      setItems((items) => [...items.filter((x) => x.id !== id)]);
    }

    setLoading(false);
  }

  async function upsert(userId: string, form: CinemaUpsertForm) {
    setUpserting(true);

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

    const [item] = data as { id: number }[];
    const relations = form.tagIds?.map((tagId) => ({
      cinema_id: item.id,
      tag_id: tagId,
      creator_id: userId,
    }));
    if (relations && relations.length) {
      await supabase().from("cinemas_tags").insert(relations);
    }

    if (error?.message) {
      //setError(error);
      alert(error.message);
    }

    setUpserting(false);
  }

  return {
    loading,
    upserting,
    error,
    items: filteredItems,

    list,
    upsert,
    remove,
  };
}

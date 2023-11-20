import supabase from "@/supabse";
import { TagDto } from "@/types/tag.dto";
import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";

export function useTagClient() {
  const [items, setItems] = useState<TagDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [upserting, setUpserting] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  let filteredItems: TagDto[] = [...items];

  async function list() {
    setLoading(true);

    const { data, error } = await supabase()
      .from("tags")
      .select()
      .order("updated_at", { ascending: false });

    if (error) {
      setError(error);
    }

    if (!error && data) {
      const items: TagDto[] = data.map((x) => ({
        id: x.id,
        name: x.name,
      }));

      setItems([...items]);
    }

    setLoading(false);
  }

  async function remove(id: number) {
    if (!id) return;

    setLoading(true);

    const { error } = await supabase().from("tags").delete().eq("id", id);
    if (error) {
      //setError(error);
      alert(error.message);
    } else {
      setItems((items) => [...items.filter((x) => x.id !== id)]);
    }

    setLoading(false);
  }

  async function upsert(userId: string, form: TagDto) {
    setUpserting(true);

    const { error } = await supabase()
      .from("cinemas")
      .upsert({
        id: form.id ?? undefined,
        name: form.name!,
        creator_id: userId,
      })
      .select();
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

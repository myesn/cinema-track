import { CinemaUpsertForm } from "@/components/CinemaManage/CinemaUpsertCard";
import supabase from "@/supabse";
import { CinemaDto } from "@/types/cinema.dto";
import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";

export function useCinema() {
  const [cinemas, setCinemas] = useState<CinemaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [upserting, setUpserting] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  let filteredCinemas: CinemaDto[] = [...cinemas];

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

      setCinemas([...items]);
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
      setCinemas((items) => [...items.filter((x) => x.id !== id)]);
    }

    setLoading(false);
  }

  async function upsert(userId: string, form: CinemaUpsertForm) {
    setUpserting(true);

    const { error } = await supabase()
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
      //setError(error);
      alert(error.message);
    }

    setUpserting(false);
  }

  return {
    loading,
    upserting,
    error,
    cinemas: filteredCinemas,

    list,
    upsert,
    remove,
  };
}

"use client";

import { useEffect } from "react";
import { CinemaUpsertForm } from "@/components/cinema-manage/cinema-upsert";
import CinemaManage from "@/components/cinema-manage/cinema-manage";
import { useCinemaClient } from "@/hooks/use-cinema-client";

export default function CinemaManageContainer(
  props: CinemaManageContainerProps
) {
  const { listing, items: cinemas, list, upsert, remove } = useCinemaClient();

  useEffect(() => {
    list();
  }, []);

  async function handleCinemaRefresh() {
    await list();
  }

  async function handleCinemaUpsert(form: CinemaUpsertForm) {
    await upsert(props.userId!, form);
    await list();
  }

  async function handleCinemaDelete(id: number) {
    await remove(id);
  }

  return (
    <CinemaManage
      userId={props.userId ?? ""}
      isSingin={!!props.userId}
      listLoading={listing}
      items={cinemas}
      onRefresh={handleCinemaRefresh}
      onUpsert={handleCinemaUpsert}
      onDelete={handleCinemaDelete}
    />
  );
}

export interface CinemaManageContainerProps {
  userId?: string;
}

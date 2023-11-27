"use client";

import { useEffect } from "react";
import { CinemaUpsertForm } from "@/components/cinema-manage/cinema-upsert";
import CinemaManage from "@/components/cinema-manage/cinema-manage";
import { useCinemaClient } from "@/hooks/use-cinema-client";

export default function CinemaManageContainer(
  props: CinemaManageContainerProps
) {
  const {
    items,

    listing,
    listError,
    list,

    upserting,
    upsertError,
    upsert,

    removing,
    removeError,
    remove,
  } = useCinemaClient();

  useEffect(() => {
    list();
  }, []);

  async function handleCinemaRefresh() {
    await list();
  }

  async function handleCinemaUpsert(form: CinemaUpsertForm) {
    await upsert(props.userId!, form);

    if (!upsertError) {
      await list();
    }
  }

  async function handleCinemaDelete(id: number) {
    await remove(id);
  }

  return (
    <CinemaManage
      userId={props.userId ?? ""}
      items={items}
      listing={listing}
      upserting={upserting}
      deleting={removing}
      listError={listError?.message}
      upsertError={upsertError?.message}
      deleteError={removeError?.message}
      onRefresh={handleCinemaRefresh}
      onUpsert={handleCinemaUpsert}
      onDelete={handleCinemaDelete}
    />
  );
}

export interface CinemaManageContainerProps {
  userId?: string;
}

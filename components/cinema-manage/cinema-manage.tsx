"use client";

import { useState } from "react";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { CinemaDto } from "@/types/cinema.dto";
import ArrowPathIcon from "@/components/icons/arrow-path-icon";
import PlusIcon from "@/components/icons/plus-icon";
import TagIcon from "@/components/icons/tag-icon";
import CinemaTable from "@/components/cinema-manage/cinema-table";
import CinemaUpsert, {
  CinemaUpsertForm,
} from "@/components/cinema-manage/cinema-upsert";
import TagManageModal from "../tag-manage-modal";

export default function CinemaManage(props: CinemaManageProps) {
  const [keyword, setKeyword] = useState("");
  const [upsertVisible, setUpsertVisible] = useState(false);
  const {
    isOpen: tagManageIsOpen,
    onOpen: onTagManageOpen,
    onOpenChange: onTagManageOpenChange,
  } = useDisclosure();
  const [upsertForm, setUpsertForm] = useState<CinemaUpsertForm | null>(null);
  const filteredItems = keyword
    ? props.items.filter(
        (x) =>
          x.name.toLowerCase().includes(keyword) ||
          x.remarks.toLowerCase().includes(keyword)
      )
    : props.items;

  function handleSearchInputChange(value: string) {
    setKeyword(value);
  }

  function handleCreateClick() {
    setUpsertVisible(true);

    // 有关键字但是筛选除的结果为空时
    if (keyword && !props.items.length) {
      setUpsertForm({ name: keyword });
    } else {
      setUpsertForm(null);
    }
  }

  function handleTagManageClick() {
    onTagManageOpen();
  }

  async function handleUpsertClick(form: CinemaUpsertForm) {
    await props.onUpsert(form);
    if (props.upsertError) {
      alert(props.upsertError);
      return false;
    }

    setUpsertForm({ id: undefined, name: "", remarks: "" });
    setUpsertVisible(false);

    return true;
  }

  async function handleCinemaItemAction(action: string, item: CinemaDto) {
    if (action === "edit") {
      setUpsertVisible(true);

      const form: CinemaUpsertForm = {
        id: item.id,
        name: item.name,
        remarks: item.remarks,
      };

      setUpsertForm(form);
    } else if (action === "delete") {
      if (confirm("确认删除？")) {
        await props.onDelete(item.id);

        if (props.deleteError) {
          alert(props.deleteError);
          return;
        }
      }
    }
  }

  return (
    <>
      <div className="flex space-x-2 mb-5 items-center">
        <Input
          size="sm"
          autoFocus
          readOnly={props.listing}
          placeholder="Search..."
          value={keyword}
          isClearable
          onValueChange={handleSearchInputChange}
          onClear={() => handleSearchInputChange("")}
        />

        <Button
          isLoading={props.listing}
          isIconOnly
          color="secondary"
          aria-label="Refresh"
          onPress={props.onRefresh}
        >
          {!props.listing && <ArrowPathIcon />}
        </Button>

        {!!props.userId && (
          <Button
            isIconOnly
            color="primary"
            aria-label="New"
            onPress={handleCreateClick}
          >
            <PlusIcon />
          </Button>
        )}

        {!!props.userId && (
          <Button
            isIconOnly
            color="primary"
            aria-label="New"
            onPress={handleTagManageClick}
          >
            <TagIcon />
          </Button>
        )}
      </div>

      {upsertVisible && (
        <CinemaUpsert
          userId={props.userId}
          form={upsertForm}
          onUpsert={handleUpsertClick}
          onClose={() => setUpsertVisible(false)}
        />
      )}

      <CinemaTable
        loading={props.listing}
        items={filteredItems}
        keyword={keyword}
        showActions={!!props.userId}
        onItemAction={handleCinemaItemAction}
      />

      <TagManageModal
        userId={props.userId}
        isOpen={tagManageIsOpen}
        onOpenChange={onTagManageOpenChange}
      />
    </>
  );
}

export interface CinemaManageProps {
  userId: string;
  items: CinemaDto[];

  listing: boolean;
  upserting: boolean;
  deleting: boolean;

  listError?: string;
  upsertError?: string;
  deleteError?: string;

  onRefresh: () => Promise<void>;
  onUpsert: (item: CinemaUpsertForm) => Promise<void>;
  onDelete: (id: CinemaDto["id"]) => Promise<void>;
}

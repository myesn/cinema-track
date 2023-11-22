"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { CinemaDto } from "@/types/cinema.dto";
import ArrowPathIcon from "@/components/icons/arrow-path-icon";
import PlusIcon from "@/components/icons/plus-icon";
import TagIcon from "@/components/icons/tag-icon";
import CinemaList from "@/components/cinema-manage/cinema-list";
import CinemaUpsert, {
  CinemaUpsertForm,
} from "@/components/cinema-manage/cinema-upsert";
import CinemaManageTagManageModal from "./cinema-manage-tag-manage-modal";

export default function CinemaManage(props: CinemaManageProps) {
  const [keyword, setKeyword] = useState("");
  const [upsertVisible, setUpsertVisible] = useState(false);
  const [tagManageIsOpen, setTagManageIsOpen] = useState(false);
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

  async function handleRefreshClick() {
    await props.onRefresh();
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
    setTagManageIsOpen(true);
  }

  async function handleUpsertClick(form: CinemaUpsertForm) {
    await props.onUpsert(form);
    setUpsertForm({ id: undefined, name: "", remarks: "" });
    setUpsertVisible(false);
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
      }
    }
  }

  return (
    <>
      <div className="flex space-x-2 mb-5 items-center">
        <Input
          size="sm"
          autoFocus
          readOnly={props.listLoading}
          placeholder="Search..."
          value={keyword}
          isClearable
          onValueChange={handleSearchInputChange}
          onClear={() => handleSearchInputChange("")}
        />

        <Button
          isLoading={props.listLoading}
          isIconOnly
          color="secondary"
          aria-label="Refresh"
          onPress={handleRefreshClick}
        >
          {!props.listLoading && <ArrowPathIcon />}
        </Button>

        {props.isSingin && (
          <Button
            isIconOnly
            color="primary"
            aria-label="New"
            onPress={handleCreateClick}
          >
            <PlusIcon />
          </Button>
        )}

        {props.isSingin && (
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
          form={upsertForm}
          onUpsert={handleUpsertClick}
          onClose={() => setUpsertVisible(false)}
        />
      )}

      <CinemaList
        loading={props.listLoading}
        items={filteredItems}
        keyword={keyword}
        showActions={props.isSingin}
        onItemAction={handleCinemaItemAction}
      />

      <CinemaManageTagManageModal
        isOpen={tagManageIsOpen}
        onClose={() => setTagManageIsOpen(false)}
      />
    </>
  );
}

export interface CinemaManageProps {
  isSingin: boolean;
  listLoading: boolean;
  items: CinemaDto[];

  onRefresh: () => Promise<void>;
  onUpsert: (item: CinemaUpsertForm) => Promise<void>;
  onDelete: (id: CinemaDto["id"]) => Promise<void>;
}

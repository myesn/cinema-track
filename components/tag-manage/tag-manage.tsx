"use client";

import { useState } from "react";
import TagManageSearch, { TagManageSearchProps } from "./tag-manage-search";
import TagManageCount from "./tag-manage-count";
import TagManageCreateTagButton, {
  TagManageCreateTagButtonProps,
} from "./tag-manage-create-tag-tutton";
import TagManageTable, {
  TagManageTableProps,
} from "./tag-manage-table/tag-manage-table";

export default function TagManage(props: TagManageProps) {
  const [searchValue, setSearchValue] = useState("");
  const filteredItems = searchValue
    ? props.items.filter((x) => x.name.includes(searchValue))
    : props.items;

  function handleSearchValueChange(value: string) {
    setSearchValue(value);
    props.onSearchValueChange && props.onSearchValueChange(value);
  }

  return (
    <div className="w-full">
      {/* <div className="px-[12px]"> */}
      {/* <TagManageTitle text={props.title} /> */}
      <TagManageSearch
        value={searchValue}
        onValueChange={handleSearchValueChange}
      />
      <TagManageCount number={filteredItems.length} />

      {!filteredItems.length && (
        <TagManageCreateTagButton text={searchValue} onPress={props.onCreate} />
      )}
      {/* </div> */}

      <TagManageTable
        items={filteredItems}
        onSelectionChange={props.onSelectionChange}
        onEditStart={props.onEditStart}
        onEditEnd={props.onEditEnd}
        onDelete={props.onDelete}
      />
    </div>
  );
}

export interface TagManageProps
  extends Pick<
    TagManageTableProps,
    "items" | "onSelectionChange" | "onEditStart" | "onEditEnd" | "onDelete"
  > {
  title: string;
  onSearchValueChange?: TagManageSearchProps["onValueChange"];
  onCreate?: TagManageCreateTagButtonProps["onPress"];
}

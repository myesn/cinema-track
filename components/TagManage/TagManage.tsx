"use client";

import { useState } from "react";
import TagManageTitle from "./TagManageTitle";
import TagManageSearch, { TagManageSearchProps } from "./TagManageSearch";
import TagManageCount from "./TagManageCount";
import TagManageCreateTagButton, {
  TagManageCreateTagButtonProps,
} from "./TagManageCreateTagButton";
import TagManageListbox, { TagManageListboxProps } from "./TagManageListbox";

export default function TagManage(props: TagManageProps) {
  const [searchValue, setSearchValue] = useState("");
  const filteredItems = searchValue
    ? props.items.filter((x) => x.text.includes(searchValue))
    : props.items;

  function handleSearchValueChange(value: string) {
    setSearchValue(value);
    props.onSearchValueChange && props.onSearchValueChange(value);
  }

  return (
    <div className="w-full">
      <div className="px-[12px]">
        {/* <TagManageTitle text={props.title} /> */}
        <TagManageSearch
          value={searchValue}
          onValueChange={handleSearchValueChange}
        />
        <TagManageCount number={filteredItems.length} />

        {!filteredItems.length && (
          <TagManageCreateTagButton
            text={searchValue}
            onPress={props.onCreate}
          />
        )}
      </div>

      <TagManageListbox
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
    TagManageListboxProps,
    "items" | "onSelectionChange" | "onEditStart" | "onEditEnd" | "onDelete"
  > {
  title: string;
  onSearchValueChange?: TagManageSearchProps["onValueChange"];
  onCreate?: TagManageCreateTagButtonProps["onPress"];
}

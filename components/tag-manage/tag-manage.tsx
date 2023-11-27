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
import React from "react";

export default function TagManage(props: TagManageProps) {
  const [keyword, setKeyword] = useState("");
  const filteredItems = React.useMemo(() => {
    let filteredTags = [...props.items];

    if (keyword) {
      filteredTags = filteredTags.filter((x) =>
        x.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return filteredTags;
  }, [props.items, keyword]);
  // const filteredItems = keyword
  //   ? props.items.filter((x) =>
  //       x.name.toLowerCase().includes(keyword.toLowerCase())
  //     )
  //   : props.items;

  function handleSearchValueChange(value: string) {
    setKeyword(value);
    props.onSearchValueChange && props.onSearchValueChange(value);
  }

  return (
    <div className="w-full">
      {/* <div className="px-[12px]"> */}
      {/* <TagManageTitle text={props.title} /> */}
      <TagManageSearch
        value={keyword}
        onValueChange={handleSearchValueChange}
      />
      <TagManageCount number={filteredItems.length} />

      {!filteredItems.length && (
        <TagManageCreateTagButton
          name={keyword}
          onPress={async (name) => {
            props.onCreate && (await props.onCreate(name));
            setKeyword("");
          }}
        />
      )}
      {/* </div> */}

      <TagManageTable
        selectable={props.selectable}
        editable={props.editable}
        deletable={props.deletable}
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
    | "selectable"
    | "editable"
    | "deletable"
    | "items"
    | "onSelectionChange"
    | "onEditStart"
    | "onEditEnd"
    | "onDelete"
  > {
  // title: string;
  onSearchValueChange?: TagManageSearchProps["onValueChange"];
  onCreate?: TagManageCreateTagButtonProps["onPress"];
}

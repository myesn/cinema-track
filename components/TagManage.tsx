"use client";

import { Input, Listbox, ListboxItem, Selection } from "@nextui-org/react";
import SearchIcon from "./icons/SearchIcon";
import { useState } from "react";

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
      <Title text={props.title} />
      <Search value={searchValue} onValueChange={handleSearchValueChange} />
      <Count number={filteredItems.length} />
      <TagListbox
        items={filteredItems}
        onSelectionChange={props.onSelectionChange}
      />
    </div>
  );
}

export interface TagManageProps
  extends Pick<TagListboxProps, "items" | "onSelectionChange"> {
  title: string;
  onSearchValueChange?: SearchProps["onValueChange"];
}

function Title(props: TitleProps) {
  return <h1>{props.text}</h1>;
}
interface TitleProps {
  text: string;
}

function Search(props: SearchProps) {
  return (
    <Input
      aria-label="Search"
      isClearable
      placeholder="Type to search..."
      labelPlacement="outside"
      startContent={<SearchIcon />}
      value={props.value}
      onValueChange={props.onValueChange}
    />
  );
}
interface SearchProps {
  value: string;
  onValueChange: (value: string) => void;
}

function Count(props: CountProps) {
  return <span>已有标签（{props.number}）</span>;
}
interface CountProps {
  number: number;
}

function TagListbox(props: TagListboxProps) {
  // https://nextui.org/docs/components/listbox#with-top--bottom-content
  return (
    <Listbox
      classNames={{
        list: "max-h-[300px] overflow-y-scroll",
      }}
      aria-label="tags listbox"
      items={props.items}
      disallowEmptySelection={false}
      selectionMode="multiple"
      variant="flat"
      onSelectionChange={props.onSelectionChange}
    >
      {/* {(item) => <TagListBoxItem key={item.key} text={item.text} />} */}
      {(item) => <ListboxItem key={item.key}>{item.text}</ListboxItem>}
    </Listbox>
  );
}
interface TagListboxProps {
  items: TagListBoxItemProps[];
  onSelectionChange?: (keys: Selection) => any;
}

function TagListBoxItem(props: TagListBoxItemProps) {
  return <ListboxItem key={props.key}>{props.text}</ListboxItem>;
}
export interface TagListBoxItemProps {
  key: string | number;
  text: string;
}

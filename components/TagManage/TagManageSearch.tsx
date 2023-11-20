import { Input } from "@nextui-org/react";
import SearchIcon from "../icons/SearchIcon";

export default function TagManageSearch(props: TagManageSearchProps) {
  return (
    <Input
      aria-label="Search"
      isClearable
      autoFocus
      placeholder="输入标签名..."
      labelPlacement="outside"
      startContent={<SearchIcon />}
      value={props.value}
      onValueChange={props.onValueChange}
    />
  );
}

export interface TagManageSearchProps {
  value: string;
  onValueChange: (value: string) => void;
}

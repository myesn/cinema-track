import { Selection } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import TagManageListItemContent from "./TagManageListItemContent";
import TagManageListItemActions from "./TagManageListItemActions";
import { Key, useCallback } from "react";

export default function TagManageList(props: TagManageListProps) {
  if (!props.items.length) return null;

  const columns = [
    { name: "标签", uid: "name" },
    { name: "操作", uid: "actions" },
  ];
  const renderCell = useCallback(
    (item: TagManageListItemProps, columnKey: Key) => {
      switch (columnKey) {
        case "name":
          return (
            <TagManageListItemContent
              name={item.name}
              isEditMode={item.isEditMode}
              onEditPress={async (newText) => {
                props.onEditEnd && (await props.onEditEnd(item.key, newText));
              }}
            />
          );
        case "actions":
          return (
            <TagManageListItemActions
              item={item}
              onEditStart={props.onEditStart}
              onDelete={props.onDelete}
            />
          );
      }
    },
    []
  );

  return (
    <>
      <Table
        hideHeader
        aria-label="tags table"
        classNames={{
          wrapper: ["max-h-[300px]", "p-0"],
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={props.items}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
export interface TagManageListProps {
  items: TagManageListItemProps[];
  onSelectionChange?: (keys: Selection) => any;
  onEditStart?: (key: string | number) => void;
  onEditEnd?: (key: string | number, newName: string) => Promise<void>;
  onDelete?: (key: string | number) => Promise<void>;
}

export interface TagManageListItemProps {
  key: string | number;
  name: string;
  isEditMode: boolean;
}

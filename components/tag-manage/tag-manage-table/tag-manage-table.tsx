import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { columns } from "./tag-manage-table-constants";
import { Key, useCallback } from "react";
import TagManageTableBodyColName from "./tag-manage-table-body-col-name";
import TagManageTableBodyColActions from "./tag-manage-table-body-col-actions";
import clsx from "clsx";

export default function TagManageTable(props: TagManageTableProps) {
  const renderCell = useCallback(
    (item: TagManageTableBodyPropsRowData, columnKey: Key) => {
      // const cellValue = item[columnKey as keyof TagManageTableBodyPropsRowData];

      switch (columnKey) {
        case "name":
          return (
            <TagManageTableBodyColName
              name={item.name}
              isEditMode={item.isEditMode}
              onEditPress={async (newName) => {
                props.onEditEnd && (await props.onEditEnd(item.key, newName));
              }}
            />
          );
        case "actions":
          return (
            <TagManageTableBodyColActions
              item={item}
              onEditStart={props.onEditStart}
              onDelete={props.onDelete}
            />
          );
      }
    },
    []
  );

  if (!props.items.length) return null;

  return (
    <Table
      hideHeader
      aria-label="tags table"
      // classNames={{
      //   wrapper: ["max-h-[300px]", "p-0"],
      // }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"no tags found"} items={props.items}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell
                className={clsx(columnKey === "actions" && "w-24", "px-0")}
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
export interface TagManageTableProps
  extends Pick<
    TagManageTableBodyProps,
    "items" | "onSelectionChange" | "onEditStart" | "onEditEnd" | "onDelete"
  > {}

export interface TagManageTableBodyProps {
  items: TagManageTableBodyPropsRowData[];
  onSelectionChange?: (keys: Selection) => any;
  onEditStart?: (key: string) => void;
  onEditEnd?: (key: string, newName: string) => Promise<void>;
  onDelete?: (key: string) => Promise<void>;
}

export interface TagManageTableBodyPropsRowData {
  key: string;
  name: string;
  isEditMode: boolean;
}

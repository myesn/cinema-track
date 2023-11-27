import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { columns } from "./tag-manage-table-constants";
import { Key, useCallback, useMemo } from "react";
import TagManageTableBodyColName from "./tag-manage-table-body-col-name";
import TagManageTableBodyColActions from "./tag-manage-table-body-col-actions";
import clsx from "clsx";
import { TagDto } from "@/types/tag.dto";

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
                props.onEditEnd && (await props.onEditEnd(item.id, newName));
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
  const classNames = useMemo(() => ({ wrapper: ["max-h-[300px]", "p-0"] }), []);

  if (!props.items.length) return null;

  return (
    <Table
      hideHeader
      aria-label="tags table"
      selectionMode="multiple"
      onSelectionChange={(keys) => {
        const keySet = keys as Set<Key>;
        const tags = props.items
          .filter((x) => keySet.has(x.id.toString()))
          .map<TagDto>(({ id, name }) => ({ id, name }));

        props.onSelectionChange && props.onSelectionChange(tags);
      }}
      classNames={classNames}
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
          <TableRow key={item.id}>
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
  onSelectionChange?: (keys: TagDto[]) => void;
  onEditStart?: (key: number) => void;
  onEditEnd?: (key: number, newName: string) => Promise<void>;
  onDelete?: (key: number) => Promise<void>;
}

export interface TagManageTableBodyPropsRowData extends TagDto {
  isEditMode: boolean;
}

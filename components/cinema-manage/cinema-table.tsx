"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { CinemaDto } from "@/types/cinema.dto";
import { useCallback, useMemo } from "react";
import { TableHeaderColumn } from "../types";
import CinemaTableBodyColActions from "./cinema-table-body-col-actions";
import clsx from "clsx";

export default function CinemaTable(props: CinemaTableProps) {
  const columns: TableHeaderColumn[] = [
    { key: "name", label: "名称" },
    { key: "remarks", label: "备注" },
    { key: "updated", label: "更新日期" },
    { key: "actions", label: "操作" },
  ];
  const classNames = useMemo(() => ({ wrapper: ["max-h-[380px]", "p-0"] }), []);
  const renderCell = useCallback((item: CinemaDto, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof CinemaDto];

    switch (columnKey) {
      case "name":
        return <p className="w-24">{cellValue}</p>;
      case "remarks":
        return <p>{cellValue}</p>;
      case "updated":
        return <p className="w-20">{cellValue}</p>;
      case "actions":
        return (
          <CinemaTableBodyColActions
            showActions={true}
            classNames="w-8"
            onAction={async (action) => {
              await props.onItemAction(action, item);
            }}
          />
        );
      default:
        return cellValue;
    }
  }, []);

  if (props.loading) {
    return <p>loading..</p>;
  }

  if (!props.items.length) {
    return (
      <>
        {props.keyword && (
          <p className="mb-1">没有找到 &quot;{props.keyword}&quot; 请添加</p>
        )}
      </>
    );
  }

  return (
    <Table
      hideHeader
      aria-label="Example table with dynamic content"
      classNames={classNames}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={props.items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell
                className={clsx(columnKey === "actions" && "w-24", "px-0")}
                align={columnKey === "actions" ? "center" : "left"}
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

export interface CinemaTableProps {
  loading: boolean;
  keyword: string | null;
  showActions: boolean;
  items: CinemaDto[];

  onItemAction: (action: string, cinema: CinemaDto) => Promise<void>;
}

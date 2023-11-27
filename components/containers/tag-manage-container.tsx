"use client";

import { useEffect, useState } from "react";
import TagManage, { TagManageProps } from "../tag-manage/tag-manage";
import { TagManageTableBodyPropsRowData } from "../tag-manage/tag-manage-table/tag-manage-table";
import { useTagClient } from "@/hooks/use-tag-client";

export default function TagManageContainer(props: TagManageContainerProps) {
  const { loading, upserting, error, items, list, upsert, remove } =
    useTagClient();
  const [rows, setRows] = useState<TagManageTableBodyPropsRowData[]>([]);

  useEffect(() => {
    list();
  }, []);

  useEffect(() => {
    setRows(() => [
      ...items.map<TagManageTableBodyPropsRowData>((x) => ({
        id: x.id,
        name: x.name,
        isEditMode: false,
      })),
    ]);
  }, [items]);

  return (
    <TagManage
      selectable={props.selectable ?? true}
      editable={props.editable ?? true}
      deletable={props.deletable ?? true}
      items={rows}
      onSelectionChange={(keys) => {
        props.onSelectionChange && props.onSelectionChange(keys);
      }}
      onCreate={async (name) => {
        await upsert(props.userId, { name });
        await list();
      }}
      onEditStart={(key) => {
        console.log("onEditStart", key);
        setRows((rows) =>
          rows.map((row) => {
            if (row.id === key) {
              return {
                ...row,
                isEditMode: true,
              };
            }

            return row;
          })
        );
      }}
      onEditEnd={async (key, newName) => {
        console.log("onEditEnd", key, newName);

        await upsert(props.userId, { id: key, name: newName });
        await list();

        setRows((rows) =>
          rows.map((row) => {
            if (row.id === key) {
              return {
                ...row,
                name: newName,
                isEditMode: false,
              };
            }

            return row;
          })
        );
      }}
      onDelete={async (key) => {
        if (confirm("确认删除？")) {
          await remove(+key);
        }
      }}
    />
  );
}

export interface TagManageContainerProps
  extends Partial<
    Pick<
      TagManageProps,
      "selectable" | "editable" | "deletable" | "onSelectionChange"
    >
  > {
  userId: string;
}

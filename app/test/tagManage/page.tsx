"use client";

import { TagManageTableBodyPropsRowData } from "@/components/tag-manage/tag-manage-table/tag-manage-table";
import TagManage from "@/components/tag-manage/tag-manage";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export default function TagManageTest() {
  const title = "标签管理";
  const [items, setItems] = useState<TagManageTableBodyPropsRowData[]>([]);

  useEffect(() => {
    setItems(
      faker.helpers.multiple<TagManageTableBodyPropsRowData>(
        () => ({
          key: faker.string.nanoid(),
          name: faker.lorem.words({ min: 1, max: 3 }),
          isEditMode: true,
        }),
        { count: { min: 100, max: 100 } }
      )
    );
  }, []);

  console.log("page: render");

  return (
    <>
      <TagManage
        title={title}
        items={items}
        onSelectionChange={(keys) => {
          console.log("onSelectionChange", keys);
        }}
        onCreate={async (name) => {
          console.log("onCreate", name);
        }}
        onEditStart={(key) => {
          console.log("onEditStart", key);
          setItems((items) =>
            items.map((item) => {
              if (item.key === key) {
                return {
                  ...item,
                  isEditMode: true,
                };
              }

              return item;
            })
          );
        }}
        onEditEnd={async (key, newName) => {
          console.log("onEditEnd", key, newName);
          setItems((items) =>
            items.map((item) => {
              if (item.key === key) {
                return {
                  ...item,
                  name: newName,
                  isEditMode: false,
                };
              }

              return item;
            })
          );
        }}
        onDelete={async (key) => {
          console.log("onDelete", key);
        }}
      />
    </>
  );
}

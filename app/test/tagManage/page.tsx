"use client";

import TagManage from "@/components/TagManage/TagManage";
import { TagManageListboxItemProps } from "@/components/TagManage/TagManageList";
import { fa, faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export default function TagManageTest() {
  const title = "标签管理";
  const [items, setItems] = useState<TagManageListboxItemProps[]>([]);

  useEffect(() => {
    setItems(
      faker.helpers.multiple<TagManageListboxItemProps>(
        () => ({
          key: faker.string.nanoid(),
          name: faker.lorem.words({ min: 1, max: 3 }),
          isEditMode: true,
        }),
        { count: { min: 0, max: 59 } }
      )
    );
  }, []);

  return (
    <>
      <TagManage
        title={title}
        items={items}
        onSelectionChange={(keys) => {
          console.log("onSelectionChange", keys);
        }}
        onCreate={async (text) => {
          console.log("onCreate", text);
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
        onEditEnd={async (key, newText) => {
          console.log("onEditEnd", key);
          setItems((items) =>
            items.map((item) => {
              if (item.key === key) {
                return {
                  ...item,
                  text: newText,
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

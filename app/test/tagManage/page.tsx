"use client";

import TagManage, { TagListBoxItemProps } from "@/components/TagManage";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export default function TagManageTest() {
  const title = "标签管理";
  const [items, setItems] = useState<TagListBoxItemProps[]>([]);

  useEffect(() => {
    setItems(
      faker.helpers.multiple<TagListBoxItemProps>(
        () => ({
          key: faker.string.nanoid(),
          text: faker.lorem.words({ min: 1, max: 3 }),
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
          console.log("tag selection change:", keys);
        }}
      />
    </>
  );
}

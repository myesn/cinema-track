"use client";

import {
  List,
  ListItem,
  Title,
  Text,
  Bold,
  Button,
  Flex,
  TextInput,
} from "@tremor/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home () {
  const items: Item[] = [
    {
      name: "Athens",
      updated: "2023-10-21",
    },
    {
      name: "Luzern",
      updated: "2023-10-21",
    },
    {
      name: "Zürich",
      updated: "2023-10-21",
    },
    {
      name: "Vienna",
      updated: "2023-10-21",
    },
    {
      name: "Ermatingen",
      updated: "2023-10-21",
    },
    {
      name: "Lisbon",
      updated: "2023-10-21",
    },
  ];
  const [filteredItems, setFilteredItems] = useState<Item[]>([...items]);

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value?.toLowerCase();
    if (!value) {
      setFilteredItems([...items]);
      return;
    }

    setFilteredItems([
      ...items.filter((x) => x.name.toLowerCase().includes(value)),
    ]);
  }

  return (
    <main className="px-10">
      <Title color="green" className="py-5">cenima records</Title>
      <TextInput
        icon={MagnifyingGlassIcon}
        placeholder="Search..."
        className="mb-5"
        onChange={handleSearchInputChange}
      />
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.name}>
            <Item {...item} />
          </ListItem>
        ))}
      </List>
    </main>
  );
};

function Item(props: ItemProps) {
  return (
    <Flex className="">
      <Bold color="violet">{props.name}</Bold>
      <Text color="violet">{props.updated}</Text>
    </Flex>
  );
}

interface Item {
  name: string;
  updated: string;
}

interface ItemProps extends Item {}

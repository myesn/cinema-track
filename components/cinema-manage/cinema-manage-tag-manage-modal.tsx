import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import TagManage from "../tag-manage/tag-manage";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { TagManageTableBodyPropsRowData } from "../tag-manage/tag-manage-table/tag-manage-table";

export default function CinemaManageTagManageModal(
  props: CinemaManageTagManageModalProps
) {
  const title = "标签管理";
  const [items, setItems] = useState<TagManageTableBodyPropsRowData[]>([]);

  useEffect(() => {
    setItems(
      faker.helpers.multiple<TagManageTableBodyPropsRowData>(
        () => ({
          key: faker.string.nanoid(),
          name: faker.lorem.words({ min: 1, max: 3 }),
          isEditMode: faker.datatype.boolean(),
        }),
        { count: { min: 59, max: 59 } }
      )
    );
  }, []);

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onClose}
      scrollBehavior={"inside"}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">标签管理</ModalHeader>
        <ModalBody className="p-0">
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
              console.log("onEditEnd", key, newText);
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export interface CinemaManageTagManageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

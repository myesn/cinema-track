import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import TagManage from "../TagManage/TagManage";
import { fa, faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { TagManageListboxItemProps } from "../TagManage/TagManageListbox";

export default function CinemaManageTagManageModal(
  props: CinemaManageTagManageModalProps
) {
  const title = "标签管理";
  const [items, setItems] = useState<TagManageListboxItemProps[]>([]);

  useEffect(() => {
    setItems(
      faker.helpers.multiple<TagManageListboxItemProps>(
        () => ({
          key: faker.string.nanoid(),
          text: faker.lorem.words({ min: 1, max: 3 }),
          isEditMode: faker.datatype.boolean(),
        }),
        { count: { min: 0, max: 59 } }
      )
    );
  }, []);

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">标签管理</ModalHeader>
        <ModalBody className="p-0">
          <TagManage
            title={title}
            items={items}
            onSelectionChange={(keys) => {
              console.log("onSelectionChange", keys);
            }}
            onCreate={(text) => {
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
            onEditEnd={(key, newText) => {
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
            onDelete={(key) => {
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

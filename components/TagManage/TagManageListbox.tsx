import { Listbox, ListboxItem, Selection } from "@nextui-org/react";
import TagManageListboxItemContent from "./TagManageListboxItemContent";
import TagManageListboxItemActions from "./TagManageListboxItemActions";

export default function TagManageListbox(props: TagManageListboxProps) {
  if (!props.items.length) return null;

  // https://nextui.org/docs/components/listbox#with-top--bottom-content
  return (
    <Listbox
      classNames={{
        list: "max-h-[300px] overflow-y-scroll",
      }}
      aria-label="tags listbox"
      items={props.items}
      disallowEmptySelection={false}
      selectionMode="none"
      variant="flat"
      onSelectionChange={props.onSelectionChange}
    >
      {/* {(item) => <TagManageListboxItem key={item.key} text={item.text} />} */}
      {(item) => (
        <ListboxItem
          key={item.key}
          endContent={
            <TagManageListboxItemActions
              item={item}
              onEditStart={props.onEditStart}
              onDelete={props.onDelete}
            />
          }
          textValue={item.text}
        >
          <TagManageListboxItemContent
            text={item.text}
            isEditMode={item.isEditMode}
            onEditPress={(newText) => {
              props.onEditEnd && props.onEditEnd(item.key, newText);
            }}
          />
        </ListboxItem>
      )}
    </Listbox>
  );
}
export interface TagManageListboxProps {
  items: TagManageListboxItemProps[];
  onSelectionChange?: (keys: Selection) => any;
  onEditStart?: (key: string | number) => void;
  onEditEnd?: (key: string | number, newText: string) => void;
  onDelete?: (key: string | number) => void;
}

export interface TagManageListboxItemProps {
  key: string | number;
  text: string;
  isEditMode: boolean;
}
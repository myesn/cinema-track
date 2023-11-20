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
      selectionMode="none"
      variant="flat"
      onSelectionChange={props.onSelectionChange}
    >
      {/* {(item) => <TagManageListboxItem key={item.key} text={item.text} />} */}
      {(item) => (
        <ListboxItem
          key={item.key}
          isReadOnly={true}
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
            onEditPress={async (newText) => {
              props.onEditEnd && await props.onEditEnd(item.key, newText);
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
  onEditEnd?: (key: string | number, newText: string) => Promise<void>;
  onDelete?: (key: string | number) => Promise<void>;
}

export interface TagManageListboxItemProps {
  key: string | number;
  text: string;
  isEditMode: boolean;
}

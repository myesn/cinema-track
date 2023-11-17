import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import EditDocumentIcon from "../icons/EditDocumentIcon";
import { TagManageListboxItemProps } from "./TagManageListbox";

export default function TagManageListboxItemContent(
  props: TagManageListboxItemContentProps
) {
  if (!props.isEditMode) {
    return props.text;
  }

  const [value, setValue] = useState(props.text);

  return (
    <div className="flex items-center">
      <Input type="text" size="sm" variant="underlined" className="w-48" value={value} onValueChange={setValue} />
      <Button
        isIconOnly
        color="danger"
        aria-label="edit tag"
        onPress={() => {
          props.onEditPress && props.onEditPress(value);
        }}
      >
        <EditDocumentIcon />
      </Button>
    </div>
  );
}
interface TagManageListboxItemContentProps
  extends Pick<TagManageListboxItemProps, "text" | "isEditMode"> {
  onEditPress?: (text: string) => void;
}

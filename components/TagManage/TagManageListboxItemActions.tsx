import { Button, Spacer } from "@nextui-org/react";
import DeleteDocumentIcon from "../icons/DeleteDocumentIcon";
import EditDocumentIcon from "../icons/EditDocumentIcon";
import { TagManageListboxItemProps } from "./TagManageListbox";

export default function TagManageListboxItemActions(
  props: TagManageListboxItemActionsProps
) {
  return (
    <div>
      <Button
        isIconOnly
        color="danger"
        aria-label="edit tag"
        onPress={() => {
          props.onEditStart && props.onEditStart(props.item.key);
        }}
      >
        <EditDocumentIcon />
      </Button>

      <Button
        isIconOnly
        color="warning"
        variant="faded"
        aria-label="delete tag"
        onPress={() => {
          props.onDelete && props.onDelete(props.item.key);
        }}
      >
        <DeleteDocumentIcon />
      </Button>
    </div>
  );
}
export interface TagManageListboxItemActionsProps {
  item: TagManageListboxItemProps;
  onEditStart?: (key: this["item"]["key"]) => void;
  onDelete?: (key: this["item"]["key"]) => void;
}

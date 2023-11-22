import { Button } from "@nextui-org/react";
import DeleteDocumentIcon from "../icons/DeleteDocumentIcon";
import EditDocumentIcon from "../icons/EditDocumentIcon";
import { TagManageListItemProps } from "./TagManageList";

export default function TagManageListItemActions(
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
  item: TagManageListItemProps;
  onEditStart?: (key: this["item"]["key"]) => void;
  onDelete?: (key: this["item"]["key"]) => void;
}

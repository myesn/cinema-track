import { Button } from "@nextui-org/react";
import DeleteDocumentIcon from "../../icons/delete-document-icon";
import EditDocumentIcon from "../../icons/edit-document-icon";
import { TagManageTableBodyPropsRowData } from "./tag-manage-table";

export default function TagManageTableBodyColActions(
  props: TagManageTableBodyColActionsProps
) {
  if (!props.editable && !props.deletable) {
    return null;
  }

  return (
    <div className="flex justify-around">
      {props.editable && (
        <Button
          isIconOnly
          color="danger"
          aria-label="edit tag"
          onPress={() => {
            props.onEditStart && props.onEditStart(props.item.id);
          }}
        >
          <EditDocumentIcon />
        </Button>
      )}

      {props.deletable && (
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="delete tag"
          onPress={() => {
            props.onDelete && props.onDelete(props.item.id);
          }}
        >
          <DeleteDocumentIcon />
        </Button>
      )}
    </div>
  );
}
export interface TagManageTableBodyColActionsProps {
  editable: boolean;
  deletable: boolean;
  item: TagManageTableBodyPropsRowData;

  onEditStart?: (id: this["item"]["id"]) => void;
  onDelete?: (id: this["item"]["id"]) => void;
}

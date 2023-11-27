import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import Cog6ToothIcon from "../icons/cog6-tooth-icon";
import EditDocumentIcon from "../icons/edit-document-icon";
import DeleteDocumentIcon from "../icons/delete-document-icon";

export default function CinemaTableBodyColActions(
  props: CinemaTableBodyColActionsProps
) {
  if (!props.showActions) {
    return null;
  }

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size="sm"
          isIconOnly
          radius="full"
          className={cn(
            "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
            props.classNames
          )}
        >
          <Cog6ToothIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Actions"
        onAction={async (key) => {
          await props.onAction(key as string);
        }}
      >
        <DropdownItem
          key="edit"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit
        </DropdownItem>

        <DropdownItem
          key="delete"
          startContent={
            <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
          }
          className="text-danger"
          color="danger"
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

interface CinemaTableBodyColActionsProps {
  showActions: boolean;
  classNames?: string;
  onAction: (action: string) => Promise<void>;
}

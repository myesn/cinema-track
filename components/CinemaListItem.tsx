import { CinemaDto } from "@/types/dto";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import Cog6ToothIcon from "./icons/Cog6ToothIcon";
import EditDocumentIcon from "./icons/EditDocumentIcon";
import DeleteDocumentIcon from "./icons/DeleteDocumentIcon";

export default function CinemaListItem(props: ItemProps) {
  const cinema = props.cinema;
  return (
    <div className="flex items-center space-x-2">
      <p color="violet" className="flex-1 font-medium truncate">
        {cinema.name}
      </p>
      <p className="flex-1 truncate">{cinema.remarks}</p>
      <p className="flex-none text-right">{cinema.updated}</p>
      {props.showActions && (
        <ActionDropDownButton
          onAction={(action) => props.onAction(action, cinema)}
        />
      )}
    </div>
  );
}

function ActionDropDownButton(props: ActionDropDownButtonProps) {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size="sm"
          isIconOnly
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          {/* Actions */}
          <Cog6ToothIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" onAction={props.onAction}>
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

export interface ItemProps {
  showActions: boolean;
  cinema: CinemaDto;
  onAction: (action: string, cinema: CinemaDto) => Promise<void>;
}

interface ActionDropDownButtonProps {
  onAction: (action: any) => Promise<void>;
}

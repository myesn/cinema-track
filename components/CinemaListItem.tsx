import supabase from "@/supabse";
import { CinemaDto } from "@/types/dto";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState } from "react";

export default function CinemaListItem(props: ItemProps) {
  const [loading, setLoading] = useState(false);

  async function handleItemAction(key: any) {
    console.log(props.id, key)
    if (key === 'edit') {

    } else if (key === 'delete') {
      await remove()
    }
  }

  async function remove() {
    setLoading(true);
    const { error } = await supabase().from('cinemas').delete().eq('id', props.id)
    if (error?.message) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Item {...props} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" onAction={handleItemAction}>
        <DropdownItem key="edit">Edit</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

function Item(props: ItemProps) {
  return <div className="flex space-x-2">
    <p color="violet" className="flex-1 font-medium truncate">{props.name}</p>
    <p className="flex-1 truncate">{props.remarks}</p>
    <p className="flex-none text-right">{props.updated}</p>
  </div>
}

export interface ItemProps extends CinemaDto { }

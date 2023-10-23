import { CinemaDto } from "@/types/dto";

export default function CinemaListItem(props: ItemProps) {
  return (
    <div className="flex space-x-2">
      <p color="violet" className="flex-1 font-medium truncate">{props.name}</p>
      <p className="flex-1 truncate">{props.remarks}</p>
      <p className="flex-none text-right">{props.updated}</p>
    </div>
  );
}

export interface ItemProps extends CinemaDto { }

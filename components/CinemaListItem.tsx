import { CinemaDto } from "@/types/dto";

export default function CinemaListItem(props: ItemProps) {
  return (
    <div className="flex">
      <p color="violet" className="flex-1 truncate">{props.name}</p>
      <p className="flex-1 truncate">{props.remarks}</p>
      <p className="flex-1">{props.updated}</p>
    </div>
  );
}

export interface ItemProps extends CinemaDto { }

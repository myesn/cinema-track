import { CinemaDto } from "@/types/dto";
import { Text, Bold, Flex } from "@tremor/react";

export default function CinemaListItem(props: ItemProps) {
  return (
    <Flex>
      <Bold color="violet" className="flex-1 truncate">{props.name}</Bold>
      <Text className="flex-1 truncate">{props.remarks}</Text>
      <Text className="flex-1">{props.updated}</Text>
    </Flex>
  );
}

export interface ItemProps extends CinemaDto { }

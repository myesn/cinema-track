import { CinemaDto } from "@/types/dto";
import { Text, Bold, Flex } from "@tremor/react";

export default function CinemaListItem(props: ItemProps) {
  return (
    <Flex>
      <Bold color="violet">{props.name}</Bold>
      <Text>{props.remarks}</Text>
      <Text>{props.updated}</Text>
    </Flex>
  );
}

export interface ItemProps extends CinemaDto {}

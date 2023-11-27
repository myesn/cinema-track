import {
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import TagManageContainer from "../containers/tag-manage-container";
import { TagDto } from "@/types/tag.dto";

export default function CinemaUpsertFormTagInput(
  props: CinemaUpsertFormTagInputProps
) {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<TagDto[]>([]);

  return (
    <div className="flex items-center">
      <Popover
        isOpen={isOpen}
        placement={"top"}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          <Button disabled={props.disabled} size="md">
            添加标签
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <TagManageContainer
            userId={props.userId}
            editable={false}
            deletable={false}
            onSelectionChange={(tags) => {
              setTags(tags);
              props.onSelectionChange(tags);
            }}
          />
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        {tags.map((tag, index) => (
          <Chip
            key={index}
            onClose={() => {
              const finalTags = tags.filter((item) => item.id !== tag.id);

              setTags(finalTags);
              props.onSelectionChange(finalTags);
            }}
            variant="flat"
          >
            {tag.name}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export interface CinemaUpsertFormTagInputProps {
  disabled: boolean;
  userId: string;

  onSelectionChange: (tags: TagDto[]) => void;
}

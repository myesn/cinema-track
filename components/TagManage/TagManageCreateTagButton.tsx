import { Button } from "@nextui-org/react";

export default function TagManageCreateTagButton({
  text,
  onPress,
}: TagManageCreateTagButtonProps) {
  return (
    <Button
      fullWidth
      color="primary"
      variant="light"
      onPress={() => {
        onPress && onPress(text);
      }}
    >
      创建标签 “{text}”
    </Button>
  );
}

export interface TagManageCreateTagButtonProps {
  text: string;
  onPress?: (text: string) => void;
}

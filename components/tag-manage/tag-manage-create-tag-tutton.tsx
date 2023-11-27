import { Button } from "@nextui-org/react";

export default function TagManageCreateTagButton({
  name,
  onPress,
}: TagManageCreateTagButtonProps) {
  if(!name) {
    return null;
  }
  
  return (
    <Button
      fullWidth
      color="primary"
      variant="light"
      onPress={async () => {
        onPress && await onPress(name);
      }}
    >
      创建标签 “{name}”
    </Button>
  );
}

export interface TagManageCreateTagButtonProps {
  name: string;
  onPress?: (name: string) => Promise<void>;
}

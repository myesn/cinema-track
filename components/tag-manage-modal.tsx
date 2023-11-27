import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import TagManageContainer, {
  TagManageContainerProps,
} from "./containers/tag-manage-container";

export default function TagManageModal(props: TagManageModalProps) {
  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">标签管理</ModalHeader>
        <ModalBody className="p-0">
          <TagManageContainer userId={props.userId} selectable={false} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export interface TagManageModalProps
  extends Pick<TagManageContainerProps, "userId"> {
  isOpen: boolean;
  onOpenChange: () => void;
}

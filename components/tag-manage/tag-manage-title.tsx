export default function TagManageTitle(props: TagManageTitleProps) {
  return <p className="text-base font-semibold mb-2">{props.text}</p>;
}

export interface TagManageTitleProps {
  text: string;
}

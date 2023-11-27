import clsx from "clsx";

export default function TagManageCount(props: TagManageCountProps) {
  if (!props.number) return null;

  return (
    <p
      className={clsx("text-sm font-light text-zinc-400 my-4", props.className)}
    >
      已有标签（{props.number}）
    </p>
  );
}

export interface TagManageCountProps {
  number: number;
  className?: string;
}

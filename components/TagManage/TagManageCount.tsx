export default function TagManageListCount(props: TagManageListCountProps) {
  if (!props.number) return null;

  return (
    <p className="text-sm font-light text-zinc-400 mt-4">
      已有标签（{props.number}）
    </p>
  );
}

export interface TagManageListCountProps {
  number: number;
}

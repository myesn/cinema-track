export const columns: TagManageTableHeaderColumn[] = [
  { key: "name", name: "标签" },
  { key: "actions", name: "操作" },
];

export interface TagManageTableHeaderColumn {
  key: string;
  name: string;
}

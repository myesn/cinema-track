import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { TagManageTableBodyPropsRowData } from "./tag-manage-table";

export default function TagManageTableBodyColName(
  props: TagManageTableBodyColNameProps
) {
  const initialValues = {
    name: props.name ?? "",
  };
  const formik = useFormik({
    initialValues,
    async onSubmit(values, formikHelpers) {
      props.onEditPress && (await props.onEditPress(values.name));
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
    },
    enableReinitialize: true,
  });

  if (!props.isEditMode) {
    return <span className="pl-1">{props.name}</span>;
  }

  return (
    <form className="flex items-center h-10" onSubmit={formik.handleSubmit}>
      <Input
        name="name"
        type="text"
        size="sm"
        isReadOnly={formik.isSubmitting}
        variant="underlined"
        className="w-full"
        value={formik.values.name}
        onChange={formik.handleChange}
      />

      <Button
        color="danger"
        isLoading={formik.isSubmitting}
        aria-label="save tag"
        type="submit"
      >
        保存
      </Button>
    </form>
  );
}
interface TagManageTableBodyColNameProps
  extends Pick<TagManageTableBodyPropsRowData, "name" | "isEditMode"> {
  onEditPress?: (name: string) => Promise<void>;
}

import { Button, Input } from "@nextui-org/react";
import { TagManageListItemProps } from "./TagManageList";
import { useFormik } from "formik";

export default function TagManageListItemContent(
  props: TagManageListItemContentProps
) {
  const formik = useFormik({
    initialValues: { name: props.name },
    async onSubmit(values, formikHelpers) {
      props.onEditPress && (await props.onEditPress(values.name));
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
    },
  });

  if (!props.isEditMode) {
    return props.name;
  }

  return (
    <form className="flex items-center" onSubmit={formik.handleSubmit}>
      <Input
        name="name"
        type="text"
        size="sm"
        isReadOnly={formik.isSubmitting}
        variant="underlined"
        className="w-48"
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
interface TagManageListItemContentProps
  extends Pick<TagManageListItemProps, "name" | "isEditMode"> {
  onEditPress?: (name: string) => Promise<void>;
}

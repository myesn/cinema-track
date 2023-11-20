import { Button, Input } from "@nextui-org/react";
import EditDocumentIcon from "../icons/EditDocumentIcon";
import { TagManageListboxItemProps } from "./TagManageListbox";
import { useFormik } from "formik";

export default function TagManageListboxItemContent(
  props: TagManageListboxItemContentProps
) {
  if (!props.isEditMode) {
    return props.text;
  }

  const formik = useFormik({
    initialValues: { name: props.text },
    async onSubmit(values, formikHelpers) {
      props.onEditPress && (await props.onEditPress(values.name));
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
    },
  });

  return (
    <form className="flex items-center" onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        size="sm"
        isReadOnly={formik.isSubmitting}
        variant="underlined"
        className="w-48"
        value={formik.values.name}
        onValueChange={formik.handleChange}
      />
      <Button
        isIconOnly
        isLoading={formik.isSubmitting}
        color="danger"
        aria-label="edit tag"
        type="submit"
      >
        <EditDocumentIcon />
      </Button>
    </form>
  );
}
interface TagManageListboxItemContentProps
  extends Pick<TagManageListboxItemProps, "text" | "isEditMode"> {
  onEditPress?: (text: string) => Promise<void>;
}

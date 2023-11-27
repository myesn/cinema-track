import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import { FormikHelpers, useFormik } from "formik";
import { CinemaDto } from "@/types/cinema.dto";
import CinemaUpsertFormTagInput from "./cinema-upsert-form-tag-input";

export default function CinemaUpsert(props: CinemaUpsertProps) {
  const isUpdate = !!props.form?.id;
  const initialValues = props.form ?? {
    id: undefined,
    name: "",
    remarks: "",
    tagIds: [],
  };
  const formik = useFormik({
    initialValues,
    async onSubmit(
      values: CinemaUpsertForm,
      formikHelpers: FormikHelpers<CinemaUpsertForm>
    ) {
      const isOk = await props.onUpsert(values);
      formikHelpers.setSubmitting(false);

      if (isOk) {
        formikHelpers.resetForm();
      }
    },
    enableReinitialize: true,
  });

  return (
    <Card>
      <CardBody className="flex-col">
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <Input
            name="name"
            placeholder="name.."
            isReadOnly={formik.isSubmitting}
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          <CinemaUpsertFormTagInput
            userId={props.userId}
            disabled={formik.isSubmitting}
            onSelectionChange={(tags) => {
              formik.setValues((values) => ({
                ...values,
                tagIds: tags.map((x) => x.id),
              }));
            }}
          />

          <Textarea
            name="remarks"
            placeholder="remarks.."
            isReadOnly={formik.isSubmitting}
            value={formik.values.remarks}
            onChange={formik.handleChange}
          />

          <div className="flex space-x-2">
            <Button
              isLoading={formik.isSubmitting}
              size="md"
              className="w-full"
              onPress={props.onClose}
            >
              关闭
            </Button>

            <Button
              isLoading={formik.isSubmitting}
              isDisabled={!formik.values.name}
              type="submit"
              size="md"
              color="primary"
              className="w-full"
            >
              {isUpdate ? "更新" : "添加"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export interface CinemaUpsertProps {
  userId: string;
  form: CinemaUpsertForm | null;
  onUpsert: (form: CinemaUpsertForm) => Promise<boolean>;
  onClose: () => void;
}

export interface CinemaUpsertForm
  extends Partial<Pick<CinemaDto, "id" | "name" | "remarks">> {
  tagIds?: number[];
}

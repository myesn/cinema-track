import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import { FormikHelpers, useFormik } from "formik";
import { CinemaDto } from "@/types/cinema.dto";
import { useEffect } from "react";

export default function CinemaUpsertDialog(props: CinemaUpsertDialogProps) {
  const isUpdate = !!props.form?.id;
  const initialValues = props.form ?? {
    id: undefined,
    name: "",
    remarks: "",
  };
  const formik = useFormik({
    initialValues,
    async onSubmit(
      values: CinemaUpsertForm,
      formikHelpers: FormikHelpers<CinemaUpsertForm>
    ) {
      await props.onUpsert(values);
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
    },
  });

  useEffect(() => {
    console.log('useEffect', initialValues)
    formik.setValues(initialValues);
  }, [props.form]);

  // const [form, setForm] = useState<CinemaUpsertForm>({
  //   id: props.form?.id,
  //   name: props.form?.name ?? "",
  //   remarks: props.form?.remarks ?? "",
  // });

  // useEffect(() => {
  //   setForm({
  //     id: props.form?.id,
  //     name: props.form?.name ?? "",
  //     remarks: props.form?.remarks ?? "",
  //   });
  // }, [props.form]);

  // function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
  //   setForm((x) => ({ ...x, [e.target.name]: e.target.value }));
  // }

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

export interface CinemaUpsertDialogProps {
  form: CinemaUpsertForm | null;
  onUpsert: (form: CinemaUpsertForm) => Promise<void>;
  onClose: () => void;
}

export interface CinemaUpsertForm
  extends Partial<Pick<CinemaDto, "id" | "name" | "remarks">> {}

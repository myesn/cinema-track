import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { CinemaDto } from "@/types/cinema.dto";

export default function CinemaUpsertDialog(props: CinemaUpsertDialogProps) {
  const isUpdate = !!props.form?.id;
  const [form, setForm] = useState<CinemaUpsertForm>({
    id: props.form?.id,
    name: props.form?.name ?? "",
    remarks: props.form?.remarks ?? "",
  });

  // useEffect(() => {
  //   setForm({
  //     id: props.form?.id,
  //     name: props.form?.name ?? "",
  //     remarks: props.form?.remarks ?? "",
  //   });
  // }, [props.form]);

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((x) => ({ ...x, [e.target.name]: e.target.value }));
  }

  return (
    <Card>
      <CardBody className="flex-col space-y-3">
        <Input
          name="name"
          placeholder="name.."
          value={form.name}
          onChange={handleTextInputChange}
        />

        <Textarea
          name="remarks"
          placeholder="remarks.."
          value={form.remarks}
          onChange={handleTextInputChange}
        />

        <div className="flex space-x-2">
          <Button
            isLoading={props.upserting}
            size="md"
            className="w-full"
            onPress={props.onClose}
          >
            关闭
          </Button>

          <Button
            isLoading={props.upserting}
            isDisabled={!form.name}
            size="md"
            color="primary"
            className="w-full"
            onPress={() => props.onUpsert(form)}
          >
            {isUpdate ? "更新" : "添加"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export interface CinemaUpsertDialogProps {
  upserting: boolean;
  form: CinemaUpsertForm | null;
  onUpsert: (form: CinemaUpsertForm) => Promise<void>;
  onClose: () => void;
}


export interface CinemaUpsertForm
  extends Partial<Pick<CinemaDto, "id" | "name" | "remarks">> {}
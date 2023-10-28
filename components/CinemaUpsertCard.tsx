import { Card, CardBody, Button, Input } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { CinemaUpsertForm } from "@/app/page";

export default function CinemaUpsertDialog(props: CinemaUpsertDialogProps) {
  const isUpdate = !!props.defaultValue?.id;
  const [form, setForm] = useState<CinemaUpsertForm>({
    id: props.defaultValue?.id,
    name: props.defaultValue?.name ?? "",
    remarks: props.defaultValue?.remarks ?? "",
  });

  useEffect(() => {
    setForm({
      id: props.defaultValue?.id,
      name: props.defaultValue?.name ?? "",
      remarks: props.defaultValue?.remarks ?? "",
    });
  }, [props.defaultValue]);

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((x) => ({ ...x, [e.target.name]: e.target.value }));
  }

  return (
    <Card className="h-48">
      <CardBody className="flex-col space-y-3">
        <Input
          name="name"
          placeholder="name..."
          value={form.name}
          onChange={handleTextInputChange}
        />

        <Input
          name="remarks"
          placeholder="remarks..."
          value={form.remarks}
          onChange={handleTextInputChange}
        />

        <Button
          isLoading={props.upserting}
          size="md"
          color="primary"
          className="w-full"
          onPress={() => props.onUpsert(form)}
        >
          {isUpdate ? "更新" : "添加"}
        </Button>
      </CardBody>
    </Card>
  );
}

export interface CinemaUpsertDialogProps {
  upserting: boolean;
  defaultValue: CinemaUpsertForm | null;
  onUpsert: (form: CinemaUpsertForm) => Promise<void>;
}

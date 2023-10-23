import { Card, CardBody, Button, Input } from "@nextui-org/react";
import { CinemaDto } from "@/types/dto";
import { ChangeEvent, useEffect, useState } from "react";
import supabase from "@/supabse";

export default function CinemaUpsertDialog(props: CinemaUpsertDialogProps) {
  const isUpdate = !!props.defaultValue?.id;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CinemaUpsertForm>({
    id: props.defaultValue?.id,
    name: props.defaultValue?.name,
    remarks: props.defaultValue?.remarks,
  });

  useEffect(() => {
    setForm({
      id: props.defaultValue?.id,
      name: props.defaultValue?.name,
      remarks: props.defaultValue?.remarks,
    });
  }, [props.defaultValue]);

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((x) => ({ ...x, [e.target.name]: e.target.value }));
  }

  async function handleUpsertClick() {
    setLoading(true);

    const { data, error } = await supabase()
      .from("cinemas")
      .upsert({
        id: form.id ?? undefined,
        name: form.name!,
        remarks: form.remarks ?? undefined,
      })
      .select();
    if (error?.message) {
      alert(error?.message);
    } else {
      props.onUpsertOk && props.onUpsertOk();
    }

    setLoading(false);
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
          isLoading={loading}
          size="md"
          color="primary"
          className="w-full"
          onClick={handleUpsertClick}
        >
          {isUpdate ? "更新" : "添加"}
        </Button>
      </CardBody>
    </Card>
  );
}

export interface CinemaUpsertDialogProps {
  defaultValue?: CinemaUpsertForm;
  onUpsertOk: () => Promise<void>;
}

export interface CinemaUpsertForm
  extends Partial<Pick<CinemaDto, "id" | "name" | "remarks">> { }

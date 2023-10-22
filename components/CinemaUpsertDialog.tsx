import { Card, Flex, TextInput, Button } from "@tremor/react";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { CinemaDto } from "@/types/dto";
import { ChangeEvent, useEffect, useState } from "react";
import supabase from "@/supabse";

export default (props: CinemaUpsertDialogProps) => {
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
      <Flex flexDirection="col" className="space-y-3">
        <TextInput
          name="name"
          placeholder="name..."
          value={form.name}
          onChange={handleTextInputChange}
        />

        <TextInput
          name="remarks"
          placeholder="remarks..."
          value={form.remarks}
          onChange={handleTextInputChange}
        />

        <Button
          icon={DocumentPlusIcon}
          loading={loading}
          size="sm"
          className="w-full"
          onClick={handleUpsertClick}
        >
          {isUpdate ? "更新" : "添加"}
        </Button>
      </Flex>
    </Card>
  );
};

export interface CinemaUpsertDialogProps {
  defaultValue?: CinemaUpsertForm;
  onUpsertOk: () => Promise<void>;
}

export interface CinemaUpsertForm
  extends Partial<Pick<CinemaDto, "id" | "name" | "remarks">> {}

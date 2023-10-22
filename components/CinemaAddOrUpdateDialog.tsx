import { Card, Flex, TextInput, Button } from "@tremor/react";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { CinemaDto } from "@/types/dto";
import { useEffect, useState } from "react";

export default (props: CinemaAddOrUpdateDialogProps) => {
  const isUpdate = !!props.defaultValue?.id;
  const [form, setForm] = useState<CinemaAddOrUpdateForm>({
    id: props.defaultValue?.id,
    name: props.defaultValue?.name,
    remarks: props.defaultValue?.remarks,
  });

  // useEffect(() => {
  //   setForm({
  //     id: props.defaultValue?.id,
  //     name: props.defaultValue?.name,
  //     remarks: props.defaultValue?.remarks,
  //   });
  // }, [props.defaultValue]);

  return (
    <Card className="h-48">
      <Flex flexDirection="col" className="space-y-3">
        <TextInput
          placeholder="name..."
          value={form?.name}
          onChange={(e) => setForm((x) => ({ ...x, name: e.target.value }))}
        />
        <TextInput
          placeholder="remarks..."
          value={form?.remarks ?? ""}
          onChange={(e) => setForm((x) => ({ ...x, remarks: e.target.value }))}
        />
        <Button icon={DocumentPlusIcon} size="sm" className="w-full">
          {isUpdate ? "更新" : "添加"}
        </Button>
      </Flex>
    </Card>
  );
};

export interface CinemaAddOrUpdateDialogProps {
  defaultValue?: CinemaAddOrUpdateForm;
}

export interface CinemaAddOrUpdateForm
  extends Partial<Pick<CinemaDto, "id" | "name" | "remarks">> {}

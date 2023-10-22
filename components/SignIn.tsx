import { Card, Flex, TextInput, Button } from "@tremor/react";
import { FaceSmileIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useState } from "react";
import supabase from "@/supabse";

export default (props: SigninProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SigninForm>({
    email: "",
    password: "",
  });

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((x) => ({ ...x, [e.target.name]: e.target.value }));
  }

  async function handleSigninClick() {
    setLoading(true);

    const { data, error } = await supabase().auth.signInWithPassword({
      email: form.email!,
      password: form.password!,
    });
    if (error?.message) {
      alert(error?.message);
    } else {
      props.onSigninOk && props.onSigninOk();
    }

    setLoading(false);
  }

  return (
    <Card className="h-48">
      <Flex flexDirection="col" className="space-y-3">
        <TextInput
          name="email"
          placeholder="email..."
          value={form.email}
          onChange={handleTextInputChange}
        />

        <TextInput
          name="password"
          placeholder="password..."
          value={form.password}
          onChange={handleTextInputChange}
        />

        <Button
          icon={FaceSmileIcon}
          loading={loading}
          size="sm"
          className="w-full"
          onClick={handleSigninClick}
        >
          登录
        </Button>
      </Flex>
    </Card>
  );
};

export interface SigninProps {
  onSigninOk: () => Promise<void>;
}

interface SigninForm {
  email?: string;
  password?: string;
}

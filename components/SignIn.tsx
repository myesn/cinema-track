import { ChangeEvent, useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import supabase from "@/supabse";

export default function SignIn(props: SigninProps) {
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
      <CardBody className="flex flex-col space-y-3">
        <Input
          name="email"
          placeholder="email..."
          value={form.email}
          onChange={handleTextInputChange}
        />

        <Input
          name="password"
          placeholder="password..."
          value={form.password}
          onChange={handleTextInputChange}
        />

        <Button
          isLoading={loading}
          size="sm"
          className="w-full"
          onClick={handleSigninClick}
        >
          登录
        </Button>
      </CardBody>
    </Card>
  );
}

export interface SigninProps {
  onSigninOk: () => Promise<void>;
}

interface SigninForm {
  email?: string;
  password?: string;
}

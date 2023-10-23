import { ChangeEvent, useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link } from "@nextui-org/react";
import supabase from "@/supabse";

export default function SignIn(props: SigninProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SigninForm>({
    email: "",
    password: "",
  });
  const emailSuffix = '@foxmail.com';

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((x) => ({ ...x, [e.target.name]: e.target.value }));
  }

  async function handleSigninClick() {
    setLoading(true);

    const { data, error } = await supabase().auth.signInWithPassword({
      email: `${form.email}${emailSuffix}`,
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
    <Modal
      isOpen={props.isOpen}
      placement="top-center"
      hideCloseButton={true}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>

        <ModalBody>
          <Input
            name="email"
            autoFocus
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">{emailSuffix}</span>
              </div>
            }
            onChange={handleTextInputChange}
          />
          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="text"
            variant="bordered"
            onChange={handleTextInputChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button color="danger" variant="flat" onPress={props.onClose}>
            Close
          </Button>
          <Button color="primary" isLoading={loading} onPress={handleSigninClick}>
            Sign in
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export interface SigninProps {
  isOpen: boolean;
  onClose: () => void;
  onSigninOk: () => Promise<void>;
}

interface SigninForm {
  email?: string;
  password?: string;
}

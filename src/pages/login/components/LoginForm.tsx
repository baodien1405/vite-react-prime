import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

import { InputTextField, PasswordField } from "@/components";
import { LoginPayload } from "@/model";

interface LoginFormProps {
  initialValues?: Partial<LoginPayload>;
  onSubmit?: (payload: LoginPayload) => void;
}

export function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
      ...initialValues,
    },
  });

  const handleFormSubmit = async (payload: LoginPayload) => {
    await onSubmit?.(payload);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-[500px] p-20"
    >
      <InputTextField
        name="email"
        control={control}
        label="Email"
        placeholder="Email"
        rootClassName="mb-2"
      />
      <PasswordField
        name="password"
        control={control}
        label="Password"
        placeholder="Enter password"
        rootClassName="mb-2"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        label="Submit"
        className="w-full"
      />
    </form>
  );
}

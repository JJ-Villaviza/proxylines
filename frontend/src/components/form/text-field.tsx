import { Link } from "@tanstack/react-router";
import { useFieldContext } from ".";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldError } from "./field-error";

type Props = {
  label: string;
  type?: string;
  login?: boolean;
};

export const TextField = ({ label, type, login }: Props) => {
  const field = useFieldContext<string>();

  return (
    <div className="grid gap-3">
      {login ? (
        <div className="flex items-center">
          <Label htmlFor={field.name}>{label}</Label>
          <Link
            to="/forget-password"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      ) : (
        <Label htmlFor={field.name}>{label}</Label>
      )}
      <Input
        id={field.name}
        value={field.state.value}
        onChange={(event) => field.handleChange(event.target.value)}
        onBlur={field.handleBlur}
        type={type}
      />
      <FieldError meta={field.state.meta} />
    </div>
  );
};

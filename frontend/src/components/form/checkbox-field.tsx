import { useFieldContext } from ".";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { FieldError } from "./field-error";

type Props = {
  label: string;
  description?: string;
};

export const CheckboxField = ({ label, description }: Props) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="grid gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => {
            field.handleChange(checked === true);
          }}
          onBlur={field.handleBlur}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor={field.name} className="cursor-pointer">
            {label}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <FieldError meta={field.state.meta} />
    </div>
  );
};

import { AuthCard } from "@/components/auth-card";
import { useAppForm } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailValidation } from "@/types/validations";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/forget-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: emailValidation,
    },
    onSubmit: async ({ value }) => console.log(value),
  });

  return (
    <AuthCard
      title="Forget Password"
      description="Enter email to reset password!"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid gap-6">
          <form.AppField
            name="email"
            children={(field: any) => (
              <field.TextField label="Email" type="email" />
            )}
          />
          <form.AppForm>
            <form.SubmitButton>Send Email</form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </AuthCard>
  );
}

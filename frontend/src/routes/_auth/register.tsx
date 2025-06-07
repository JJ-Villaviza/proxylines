import { AuthCard } from "@/components/auth-card";
import { useAppForm } from "@/components/form";
import { registerValidation } from "@/types/validations";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      agreement: false,
    },
    validators: {
      onChange: registerValidation,
    },
    onSubmit: async ({ value }) => console.log(value),
  });

  return (
    <AuthCard title="Register" description="Enter details to register!">
      <form>
        <div className="grid gap-6">
          <form.AppField
            name="name"
            children={(field: any) => <field.TextField label="Name" />}
          />
          <form.AppField
            name="email"
            children={(field: any) => (
              <field.TextField label="Email" type="email" />
            )}
          />
          <div className="flex flex-row gap-2">
            <form.AppField
              name="username"
              children={(field: any) => <field.TextField label="Username" />}
            />
            <form.AppField
              name="password"
              children={(field: any) => (
                <field.TextField
                  label="Password"
                  type="password"
                  login={false}
                />
              )}
            />
          </div>
          <form.AppField
            name="agreement"
            children={(field: any) => (
              <field.CheckboxField label="I agree and read the Terms and Agreement" />
            )}
          />
          <form.AppForm>
            <form.SubmitButton>Register</form.SubmitButton>
          </form.AppForm>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}

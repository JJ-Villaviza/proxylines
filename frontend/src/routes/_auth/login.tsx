import { AuthCard } from "@/components/auth-card";
import { useAppForm } from "@/components/form";
import { loginValidation } from "@/types/validations";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onChange: loginValidation,
    },
    onSubmit: async ({ value }) => console.log(value),
  });

  return (
    <AuthCard title="Login" description="Enter details to login!">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid gap-6">
          <form.AppField
            name="username"
            children={(field: any) => <field.TextField label="Username" />}
          />
          <form.AppField
            name="password"
            children={(field: any) => (
              <field.TextField label="Password" type="password" login={true} />
            )}
          />
          <form.AppForm>
            <form.SubmitButton>Login</form.SubmitButton>
          </form.AppForm>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Register
            </Link>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}

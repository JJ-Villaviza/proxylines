import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription>Enter details to register!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="flex gap-3">
              <Checkbox id="agreement" />
              <Label htmlFor="agrement">
                I agree and read the Terms and Agreement
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

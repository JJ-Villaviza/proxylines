import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/forget-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Forget Password</CardTitle>
        <CardDescription>Enter email to reset password!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Email
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

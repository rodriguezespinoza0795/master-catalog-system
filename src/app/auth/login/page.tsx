import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoginForm } from "@/components/auth/forms/LoginForm/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <div className="grid p-0">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <CardHeader className="flex flex-col items-center text-center">
                <CardTitle className="text-2xl font-bold">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
                <div className="grid gap-2 justify-center mt-4">
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="text-center text-sm justify-center gap-1">
                <Label>Don&apos;t have an account?</Label>
                <Link
                  href="/auth/register"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </CardFooter>
            </div>
          </div>
        </div>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginPage;

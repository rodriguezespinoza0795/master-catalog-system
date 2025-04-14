import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import RegisterForm from "@/components/auth/forms/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <div className="grid p-0 max-w-sm">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <CardHeader className="flex flex-col items-center text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Create account
                </CardTitle>
                <CardDescription className="text-balance text-muted-foreground">
                  Sign up to access Acme Inc
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
              <CardFooter className="text-center text-sm justify-center gap-1">
                <Label>Already have an account?</Label>
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
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

export default RegisterPage;

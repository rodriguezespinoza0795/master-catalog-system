import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import ResetPasswordForm from "@/components/auth/forms/ResetPassword/ResetPasswordForm";

const ConfirmResetPasswordPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <div className="grid p-0">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <CardHeader>
                <div className="space-y-2 text-center">
                  <CardTitle className="text-2xl font-bold tracking-tight">
                    Reset your password
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Enter your new password to regain access to your account.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ResetPasswordForm />
              </CardContent>
              <CardFooter className="flex flex-col items-center text-center space-y-2">
                <Link
                  href="/auth/login"
                  className="text-sm text-primary hover:underline"
                >
                  Back to login
                </Link>
              </CardFooter>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmResetPasswordPage;

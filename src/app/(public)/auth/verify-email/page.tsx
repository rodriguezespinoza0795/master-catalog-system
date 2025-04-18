import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import VerifyEmailForm from "@/components/auth/forms/VerifyEmailForm/VerifyEmailForm";

const VerifyEmailPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <div className="grid p-0">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <CardHeader className="flex flex-col items-center text-center space-y-2">
                <CardTitle className="text-2xl font-bold">
                  Code verification
                </CardTitle>
                <CardDescription className="text-balance text-muted-foreground">
                  Enter the code to verify your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VerifyEmailForm />
              </CardContent>
              <CardFooter className="flex flex-col items-center text-center space-y-2">
                <div className="text-center text-sm">
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline"
                  >
                    Back to login
                  </Link>
                </div>
              </CardFooter>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;

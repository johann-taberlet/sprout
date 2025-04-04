import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/core/components/ui/card";
import { getTranslations } from "next-intl/server";

interface SignUpSuccessPageProps {
  params: { locale: string };
}

export default async function SignUpSuccessPage({
  params,
}: SignUpSuccessPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {t("signUp.success.title")}
              </CardTitle>
              <CardDescription>
                {t("signUp.success.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("signUp.success.message")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

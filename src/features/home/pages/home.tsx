import { Button } from "@/features/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/core/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Link } from "@/features/core/i18n/navigation";

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{t("welcome")}</CardTitle>
            <CardDescription>{t("signInOrUp")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Link href={"/auth/login"} className="w-full">
                <Button className="w-full" size="lg">
                  {t("login")}
                </Button>
              </Link>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t("or")}
                  </span>
                </div>
              </div>
              <Link href={"/auth/sign-up"} className="w-full">
                <Button variant="outline" className="w-full" size="lg">
                  {t("createAccount")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

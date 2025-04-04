import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/features/core/components/ui/card";
import { getTranslations } from "next-intl/server";

interface ErrorPageProps {
  params: { locale: string };
  searchParams: Promise<{ error: string }>;
}

export default async function ErrorPage({
  params,
  searchParams,
}: ErrorPageProps) {
  const { locale } = await params;
  const awaitedSearchParams = await searchParams;
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("error.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              {awaitedSearchParams?.error ? (
                <p className="text-sm text-muted-foreground">
                  {t("error.code", { error: awaitedSearchParams.error })}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t("error.unspecified")}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

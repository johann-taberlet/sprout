"use client";

import { useState } from "react";
import { cn } from "@/features/core/lib/utils/shadcn";
import { createClient } from "@/features/core/lib/supabase/client";
import { Button } from "@/features/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/core/components/ui/card";
import { Input } from "@/features/core/components/ui/input";
import { Label } from "@/features/core/components/ui/label";
import { DEFAULT_AUTHENTICATED_ROUTE } from "@/features/core";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push(DEFAULT_AUTHENTICATED_ROUTE);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t("error.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {t("updatePassword.title")}
          </CardTitle>
          <CardDescription>{t("updatePassword.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">{t("fields.newPassword")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("fields.newPassword")}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? t("updatePassword.loading")
                  : t("updatePassword.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

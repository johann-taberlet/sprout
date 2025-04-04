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
import Link from "next/link";
import { useTranslations } from "next-intl";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("auth");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t("error.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {t("forgotPassword.success.title")}
            </CardTitle>
            <CardDescription>
              {t("forgotPassword.success.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("forgotPassword.success.message")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {t("forgotPassword.title")}
            </CardTitle>
            <CardDescription>{t("forgotPassword.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("fields.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? t("forgotPassword.loading")
                    : t("forgotPassword.submit")}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                {t("login.haveAccount")}{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  {t("login.link")}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

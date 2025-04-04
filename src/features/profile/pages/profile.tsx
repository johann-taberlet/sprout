import { redirect } from "next/navigation";

import { LogoutButton } from "@/features/auth/components/logout-button";
import { createClient } from "@/features/core/lib/supabase/server";
import { getTranslations } from "next-intl/server";

interface ProfilePageProps {
  params: { locale: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  const supabase = await createClient();
  const t = await getTranslations({ locale, namespace: "profile" });

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        {t("greeting")} <span>{data.user.email}</span>
      </p>
      <LogoutButton />
    </div>
  );
}

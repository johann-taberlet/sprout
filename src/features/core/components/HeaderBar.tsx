"use client";

import { useCurrentUser } from "@/features/current-user/hooks/useCurrentUser";
import { Button } from "@/features/core/components/ui/button";
import { CurrentUserAvatar } from "@/features/current-user/components/CurrentUserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/core/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { Link } from "@/features/core/i18n/navigation";

export function HeaderBar() {
  const { isAuthenticated, loading } = useCurrentUser();
  const t = useTranslations("header");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold">
            Sprout
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!loading && (
            <>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <CurrentUserAvatar />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">{t("profile")}</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/auth/login">{t("login")}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/sign-up">{t("register")}</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

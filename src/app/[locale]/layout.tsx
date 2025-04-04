import type { Metadata } from "next";
import "@/app/[locale]/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/features/core";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/features/core/i18n/routing";
import { loadFeatureTranslations } from "@/features/core/i18n/request";
import { HeaderBar } from "@/features/core/components/HeaderBar";

// Define Locale type locally if not exported from routing
type Locale = (typeof routing.locales)[number];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    console.warn(`Invalid locale for metadata: ${locale}. Using default.`);
    const defaultLocale = routing.defaultLocale;
    const t = await getTranslations({
      locale: defaultLocale,
      namespace: "RootLayout",
    });
    return {
      title: t("title") + " (Default)",
      description: t("description") + " (Default Locale)",
    };
  }

  const t = await getTranslations({ locale, namespace: "RootLayout" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await loadFeatureTranslations(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone="UTC"
          now={new Date()}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-svh flex-col">
              <HeaderBar />
              <main className="flex-1">{children}</main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

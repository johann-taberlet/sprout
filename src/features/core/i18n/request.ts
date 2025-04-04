import { getRequestConfig } from "next-intl/server";
import fs from "fs/promises";
import path from "path";

type TranslationValue =
  | string
  | { [key: string]: string | { [subKey: string]: string } };

interface TranslationMessages {
  [namespace: string]: TranslationValue | { [key: string]: TranslationValue };
}

interface FeatureTranslations {
  [namespace: string]: TranslationValue;
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function loadFeatureTranslations(
  locale: string
): Promise<TranslationMessages> {
  const messages: TranslationMessages = {};
  const featuresPath = path.join(process.cwd(), "src/features");

  try {
    // Get all items in features directory
    const items = await fs.readdir(featuresPath);

    // Filter to only include directories
    const features = await Promise.all(
      items.map(async (item) => ({
        name: item,
        isDir: await isDirectory(path.join(featuresPath, item)),
      }))
    );

    // Load translations from each feature that has them
    await Promise.all(
      features
        .filter((f) => f.isDir)
        .map(async ({ name: feature }) => {
          try {
            const translationPath = path.join(
              featuresPath,
              feature,
              "i18n",
              `${locale}.json`
            );
            const content = await fs.readFile(translationPath, "utf-8");
            const featureTranslations = JSON.parse(
              content
            ) as FeatureTranslations;

            if (feature === "core") {
              // Core translations go directly to root level
              Object.assign(messages, featureTranslations);
            } else {
              // For feature translations, use the feature name as the namespace
              messages[feature] = featureTranslations;
            }
          } catch (error) {
            // Skip if translation file doesn't exist for this feature
            if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
              console.error(
                `Error loading translations for feature ${feature}:`,
                error
              );
            }
          }
        })
    );
  } catch (error) {
    console.error("Error loading translations:", error);
  }

  return messages;
}

export default getRequestConfig(async ({ locale = "en" }) => {
  const messages = await loadFeatureTranslations(locale);

  return {
    locale,
    messages,
    timeZone: "UTC",
    now: new Date(),
  };
});

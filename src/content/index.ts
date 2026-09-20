import { en } from "./en";
import { es } from "./es";
import { locales, type Locale } from "./types";

const dictionaries = { es, en };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale) => dictionaries[locale];

import en from "./en.json";
import uk from "./uk.json";

export default function Locale(locale: string) {
  return {
    props: {
      messages: locale === "en" ? { ...en } : { ...uk },
    },
  };
}

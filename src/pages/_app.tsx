import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "@/styles/react-calendar.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextIntlProvider } from "next-intl";
import Locale from "@/locales/locales";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
const lang =
  typeof window !== "undefined"
    ? window.localStorage?.getItem("locale") || "en"
    : "en";

const App = ({ Component, pageProps }: AppProps) => {
  const [messages, setMessages] = useState(Locale("en").props.messages);

  useEffect(() => {
    const lang =
      typeof window !== "undefined"
        ? window.localStorage?.getItem("locale") || "en"
        : "en";

    import(`../locales/${lang}.json`).then((data) => {
      setMessages(data);
    });
    console.log(messages);
  }, []);
  return (
    <NextIntlProvider messages={messages}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </NextIntlProvider>
  );
};

export default App;

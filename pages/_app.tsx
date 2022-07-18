import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { appTheme } from "theme";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      retryDelay: () => 0,
      refetchOnWindowFocus: false,
    },
  },
});

export default function HotelsApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <div>
      <Head>
        <title>hotels app</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={appTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </div>
  );
}

import { ChakraProvider } from "@chakra-ui/core";
import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { appTheme } from "theme";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      retry: 0,
      retryDelay: () => 0,
      refetchOnWindowFocus: false,
    },
  },
});

export default function DemoApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <div>
      <Head>
        <title>truerism task</title>
      </Head>

      <ReactQueryCacheProvider queryCache={queryCache}>
        <ChakraProvider resetCSS theme={appTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ReactQueryCacheProvider>
    </div>
  );
}

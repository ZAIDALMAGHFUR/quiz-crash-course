import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { NhostAuthProvider } from "@nhost/react-auth";
import { NhostApolloProvider } from "@nhost/react-apollo";

import { auth } from "@/utils/nhost";

function MyApp({ Component, pageProps }) {
  return (
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider
        auth={auth}
        gqlEndpoint={process.env.NEXT_PUBLIC_NHOST_GRAPHQL}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </NhostApolloProvider>
    </NhostAuthProvider>
  );
}

export default MyApp;

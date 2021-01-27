import React from "react";
import NextLink from "next/link";
import { Button, Flex, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useAuth } from "@nhost/react-auth";
import { auth } from "@/utils/nhost";

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

export default function Container({ children }) {
  const { signedIn } = useAuth();
  const handleLogout = () => {
    auth.logout(false);
  };
  return (
    <Box height="100%" width="100%">
      <StickyNav
        flexDirection="row"
        maxWidth="1200px"
        width="100%"
        as="nav"
        p={8}
        mt={[0, 8]}
        mb={8}
        mx="auto"
      >
        {!signedIn && (
          <Box>
            <NextLink href="/">
              <Button as="a" variant="ghost" p={[1, 4]}>
                Home
              </Button>
            </NextLink>
            <NextLink href="/login">
              <Button as="a" variant="ghost" p={[1, 4]}>
                Login
              </Button>
            </NextLink>
            <NextLink href="/signup">
              <Button as="a" variant="ghost" p={[1, 4]}>
                Sign Up
              </Button>
            </NextLink>
          </Box>
        )}
        {signedIn && (
          <Box>
            <NextLink href="/">
              <Button as="a" variant="ghost" p={[1, 4]}>
                Home
              </Button>
            </NextLink>
            <NextLink href="/create">
              <Button as="a" variant="ghost" p={[1, 4]}>
                Create Question
              </Button>
            </NextLink>
            <NextLink href="/quiz">
              <Button as="a" variant="ghost" p={[1, 4]}>
                Take a quiz
              </Button>
            </NextLink>
            <Button variant="ghost" p={[1, 4]} onClick={handleLogout}>
              Log out
            </Button>
          </Box>
        )}
      </StickyNav>
      <Flex
        direction="column"
        alignContent="center"
        justifyContent="center"
        width="75%"
        mx="auto"
        height="70vh"
      >
        {children}
      </Flex>
    </Box>
  );
}

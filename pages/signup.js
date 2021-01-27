import React, { useState } from "react";
import { useRouter } from "next/router";

import { auth } from "@/utils/nhost";

import {
  Text,
  Stack,
  Input,
  Button,
  Center,
  Heading,
  Box,
} from "@chakra-ui/react";

import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

import Container from "@/components/ContainerComponent";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const GITHUB_LOGIN = `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/auth/providers/github`;
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await auth.register(email, password, {
        display_name: displayName,
      });
    } catch (error) {
      return alert("Registration Failed");
    }

    router.push("/login");
  }

  return (
    <Container>
      <Heading as="h1" textAlign="center">
        Register
      </Heading>
      <Center>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Name"
            autoFocus
            mt={[2, 4]}
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoFocus
            mt={[2, 4]}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            mt={[2, 4]}
          />
          <Box mx="auto" width="100%">
            <Button
              colorScheme="green"
              width="45%"
              mt={[2, 4]}
              ml={4}
              type="submit"
            >
              Sign Up
            </Button>
            <Button
              colorScheme="red"
              width="45%"
              mt={[2, 4]}
              ml={4}
              as="a"
              href="/"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Center>
      <Center>
        <Stack isInline ml={4} mt={6} spacing={8} alignContent="center">
          <Button aria-label="Google Login" leftIcon={<FaGoogle />}>
            Google
          </Button>
          <Button
            as="a"
            href={GITHUB_LOGIN}
            aria-label="Github Login"
            leftIcon={<FaGithub />}
          >
            Github
          </Button>
          <Button aria-label="Facebook Login" leftIcon={<FaFacebook />}>
            Facebook
          </Button>
        </Stack>
      </Center>
      <Text mt={4} textAlign="center">
        Already have an account? <a href="/login">Click here to Sign Up</a>
      </Text>
    </Container>
  );
}

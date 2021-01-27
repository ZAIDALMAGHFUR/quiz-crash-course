import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export function NoQuestion() {
  return (
    <Box>
      <Heading as="h1" textAlign="center">
        Sorry we don't have any questions!
      </Heading>
      <Flex flexDirection={"column"} justifyContent="center" mt={8}>
        <Text textAlign="center">
          Click Below to add questions for your friends!
        </Text>
      </Flex>
      <Flex mt={8} justifyContent="center">
        <Button width="50%" as="a" href="/create">
          Create
        </Button>
      </Flex>
    </Box>
  );
}

import Container from "@/components/ContainerComponent";
import { Heading, Text, Button, Stack, Box } from "@chakra-ui/react";
import { useAuth } from "@nhost/react-auth";

export default function Home() {
  const { signedIn } = useAuth();
  return (
    <Container>
      <Heading as="h1" textAlign="center">
        Welcome to our Quiz!
      </Heading>
      <Box mt={8} mx="auto">
        <Text textAlign="center">
          Welcome to our quiz app! To get started click a button below.
        </Text>
        {!signedIn && (
          <Stack justifyContent="center" isInline mt={6}>
            <Button width="25%" as="a" href="/signup">
              Signup
            </Button>
            <Button width="25%" as="a" href="/login">
              Login
            </Button>
          </Stack>
        )}
        {signedIn && (
          <Stack justifyContent="center" isInline mt={6}>
            <Button width="25%" as="a" href="/create">
              Create a question
            </Button>
            <Button width="25%" as="a" href="/quiz">
              Take a quiz
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  );
}

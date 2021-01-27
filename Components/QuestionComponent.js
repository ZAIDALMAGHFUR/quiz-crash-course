import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SUBMIT_ANSWER } from "@/utils/api";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

export function Question({ question, onNextClicked }) {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [submitAnswer] = useMutation(SUBMIT_ANSWER);

  const onOptionClicked = async (option) => {
    try {
      await submitAnswer({
        variables: {
          answer_id: option.id,
          question_id: question.id,
        },
      });
      setAnswered(true);
      setSelectedOption(option.answer);
    } catch (error) {
      console.log(error);
    }
  };
  const submitQuestion = () => {
    setAnswered(false);
    setSelectedOption({});
    onNextClicked(selectedOption);
  };
  return (
    <Box>
      <Heading as="h1" textAlign="center">
        How Many Can You Get Right?
      </Heading>
      <Box>
        <Heading mt={8} as="h6" size="md" textAlign="center">
          Question: {question.question}
        </Heading>
      </Box>
      <Flex
        flexDirection={"column"}
        justifyContent="center"
        flexShrink="1"
        mt={8}
        wrap
      >
        {question.question_answers.map((option) => {
          return (
            <Button
              mx="auto"
              mt="4"
              width="50%"
              minWidth="150px"
              variant="outline"
              key={option.answer}
              onClick={() => onOptionClicked(option)}
            >
              {option.answer}
            </Button>
          );
        })}
      </Flex>
      {answered && (
        <Box mt={8} align="right">
          <Button width="25%" onClick={submitQuestion}>
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}

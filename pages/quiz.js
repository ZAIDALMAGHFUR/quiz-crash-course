import React, { useState } from "react";
import { Button, Box, Flex, Text } from "@chakra-ui/react";
import { PrivateRoute } from "@/components/PrivateRoute";
import { GET_UNANSWERED_QUESTIONS, RESTART_QUIZ } from "@/utils/api";
import { useQuery, useMutation } from "@apollo/client";
import { Question } from "@/components/QuestionComponent";
import Container from "@/components/ContainerComponent";
import { NoQuestion } from "@/components/NoQuestionComponent";
import { Results } from "@/components/ResultsComponent";

function Quiz() {
  const { loading, data } = useQuery(GET_UNANSWERED_QUESTIONS);
  const [restartQuiz] = useMutation(RESTART_QUIZ);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);
  const resetQuiz = async () => {
    try {
      await restartQuiz({});
      setCurrentIndex(0);
      setShowFinished(false);
      setScore(0);
    } catch (error) {
      console.log(error);
      return alert("Error restarting quiz");
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (data && data.unanswered_questions.length > 0) {
    const { unanswered_questions } = data;
    const currentQuestion = unanswered_questions[currentIndex];
    const onNextClicked = (selectedOption) => {
      const currentAnswers = currentQuestion.question_answers;
      const answer = currentAnswers.find(
        (answers) => answers.answer === selectedOption
      );
      if (answer.is_correct) {
        setScore(score + 1);
      }
      if (currentIndex + 1 > unanswered_questions.length - 1) {
        setShowFinished(true);
        return;
      }
      setCurrentIndex(currentIndex + 1);
    };

    return (
      <Container>
        <Box p={8} boxShadow="dark-lg" rounded="md">
          <Box>
            {showFinished ? (
              <Results
                score={score}
                numOfQuestions={unanswered_questions.length}
              />
            ) : (
              <Box>
                <Question
                  onNextClicked={onNextClicked}
                  question={currentQuestion}
                  key={currentQuestion.id}
                />
              </Box>
            )}
            {showFinished ? (
              <Flex justifContent="center" mt={8}>
                <Button width="50%" variant="outline" onClick={resetQuiz}>
                  Try Again
                </Button>
              </Flex>
            ) : (
              <Text textAlign="left">
                {currentIndex + 1} / {unanswered_questions.length}
              </Text>
            )}
          </Box>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container>
        <Box p={8} boxShadow="dark-lg" rounded="md">
          <Box>
            <NoQuestion />
          </Box>
        </Box>
      </Container>
    );
  }
}

export default PrivateRoute(Quiz);

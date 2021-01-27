import { gql } from "@apollo/client";

export const GET_UNANSWERED_QUESTIONS = gql`
  query unanswered_questions {
    unanswered_questions {
      id
      question
      question_answers {
        id
        answer
        is_correct
      }
    }
  }
`;

export const CREATE_NEW_QUESTION = gql`
  mutation create_new_question(
    $question: String!
    $question_answers: question_answers_arr_rel_insert_input!
  ) {
    insert_questions_one(
      object: { question: $question, question_answers: $question_answers }
    ) {
      id
      question
      created_at
      question_answers {
        answer
      }
    }
  }
`;

export const SUBMIT_ANSWER = gql`
  mutation submit_question($answer_id: uuid, $question_id: uuid) {
    insert_users_answers_one(
      object: { answer_id: $answer_id, question_id: $question_id }
    ) {
      id
    }
  }
`;

export const RESTART_QUIZ = gql`
  mutation restartQuiz {
    delete_users_answers(where: {}) {
      affected_rows
    }
  }
`;

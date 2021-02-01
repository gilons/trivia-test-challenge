import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Question } from "../../question/types";
import { useSelector } from "react-redux";
import { answersSelector } from "../../question/slice";

// types
type AnswerProp = {
  question: Question;
  index: number;
};
export const Answer = ({ question, index }: AnswerProp): ReactElement => {
  // react-redux selectors
  const answers = useSelector(answersSelector);

  // computed variables
  const isCorrect = answers[index] == question.correct_answer;
  const isWrong =
    question.incorrect_answers &&
    answers[index] === question.incorrect_answers[0];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.markerContainer}>
        <Text
          style={[
            styles.makerText,
            { color: isCorrect ? "green" : isWrong ? "orange" : "#FFF1EF" },
          ]}
        >
          {isCorrect ? "✅" : isWrong ? "❌" : "X"}
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 70,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  markerContainer: {
    height: "100%",
    width: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  makerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontWeight: "500",
    fontSize: 20,
  },
});

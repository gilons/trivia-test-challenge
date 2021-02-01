import React, { ReactElement, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { currentAnswerSelector } from "../slice";
import { Question } from "../types";

/**
 * types
 */
type AnswererType = {
  answers: string[];
  question: Question;
  respond: Function;
};

export const Answerer = ({
  answers,
  question,
  respond = () => {},
}: AnswererType): ReactElement => {
  // react refs
  const spinner = useRef(new Animated.Value(0)).current;
  const spine = useRef(
    Animated.timing(spinner, {
      useNativeDriver: true,
      duration: 1000,
      toValue: 1000,
    })
  ).current;

  // react-redux selectors
  const currentAnswer = useSelector(currentAnswerSelector);

  // computed variables
  const isCorrect = currentAnswer == question.correct_answer;
  const isWrong =
    question.incorrect_answers &&
    currentAnswer === question.incorrect_answers[0];

  // functions
  const respondTrue = (): void => {
    spine.start(resetAnimation);
    respond("True");
  };
  const resetAnimation = (): void => {
    spinner.setValue(0);
  };
  const respondFalse = (): void => {
    spine.start(resetAnimation);
    respond("False");
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={respondFalse}
        style={[styles.answer, styles.false]}
      >
        <Text style={styles.answerText}>{answers[0]}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.separator,
          {
            backgroundColor: isCorrect
              ? "green"
              : isWrong
              ? "orange"
              : "#FFF1EF",
            transform: [
              {
                rotate: spinner.interpolate({
                  inputRange: [0, 1000],
                  outputRange: ["60deg", "1680deg"],
                }),
              },
            ],
          },
        ]}
      />
      <TouchableOpacity
        onPress={respondTrue}
        style={[styles.answer, styles.true]}
      >
        <Text style={styles.answerText}>{answers[1]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3,
    alignItems: "center",
    backgroundColor: "white",
    width: 210,
  },
  answer: {
    elevation: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.4,
    height: 50,
    backgroundColor: "white",
    width: 50,
    borderRadius: 45,
  },
  answerText: {
    fontSize: 27,
    color: "white",
    fontWeight: "bold",
  },
  true: {
    backgroundColor: "green",
  },
  false: {
    backgroundColor: "orange",
  },
  separator: {
    width: 100,
    height: 10,
    backgroundColor: "#FFF1EF",
    borderRadius: 10,
    transform: [{ rotate: "-60deg" }],
    elevation: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
});

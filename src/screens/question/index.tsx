import React, { ReactElement, useEffect, useRef } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { Answerer } from "./components/Answerer";
import { QuestionHeader } from "./components/Header";
import { QuestionTimer } from "./components/Timer";
import { useSelector, useDispatch } from "react-redux";
import {
  questionSelector,
  currentIndexSelector,
  addAnswers,
  setCurrentIndex,
  numberOfQuestions,
} from "./slice";
import { Question as Quest } from "./types";
import { TypeWriter } from "../../components/TypeWriter";

export const Question = ({ navigation }: any): ReactElement => {
  // react-refs
  const answered = useRef(false);

  // react-redux selectors
  const question: Quest = useSelector(questionSelector);
  const questionsCount: number = useSelector(numberOfQuestions);
  const index: number = useSelector(currentIndexSelector);

  //react-redux dispatcher
  const dispatcher = useDispatch();

  // functions
  const gotoNextQuestion = (): void => {
    !answered.current && respond("");
  };
  const respond = (answer: string): void => {
    answered.current = true;
    dispatcher(addAnswers({ answer, index }));
    setTimeout(() => {
      if (index == questionsCount - 1) {
        navigation.navigate("result");
      } else {
        dispatcher(setCurrentIndex(index + 1));
        navigation.push("question");
      }
    }, 1000);
  };
  const startRespond = (response: string) => {
    !answered.current && respond(response);
  };

  // react effects
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.questionContainer}>
        <View style={styles.questionHeaderContainer}>
          <QuestionHeader
            category={question.category}
            difficulty={question.difficulty}
          />
        </View>
        <View style={styles.textContainer}>
          <TypeWriter
            text={question.question}
            duration={10}
            style={styles.questionText}
          />
        </View>
        <View>
          <Text style={styles.indexText}>{`${
            index + 1
          }/${questionsCount}`}</Text>
        </View>
        <Answerer
          question={question}
          answers={["❌", "✅"]}
          respond={startRespond}
        />
        <QuestionTimer onEnd={gotoNextQuestion} duration={20000} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  questionContainer: {
    borderRadius: 15,
    shadowOpacity: 0.3,
    marginTop: 1,
    width: "99%",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowRadius: 5,
    elevation: 2,
  },
  questionHeaderContainer: {
    backgroundColor: "white",
    minHeight: 50,
    width: "100%",
  },
  questionText: {
    fontWeight: "500",
    fontSize: 20,
  },
  indexText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textContainer: {
    minWidth: 100,
    minHeight: 100,
    backgroundColor: "white",
    elevation: 1,
    textAlign: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: "black",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    maxWidth: 400,
  },
});

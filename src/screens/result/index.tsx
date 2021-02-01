import React, { ReactElement, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuestions,
  numberOfQuestions,
  passedQuestionsSelector,
  questionsSelector,
} from "../question/slice";
import { ScrollView } from "react-native-gesture-handler";
import { Answer } from "./components/Answer";
import { Question } from "../question/types";

export const Result = ({ navigation }: any): ReactElement => {
  // react refs
  const heightAnimated = useRef(new Animated.Value(0)).current;
  const heightAnimator = useRef(
    Animated.timing(heightAnimated, {
      toValue: 100,
      useNativeDriver: false,
      duration: 6000,
    })
  ).current;

  // react-redux selectors
  const score = useSelector(passedQuestionsSelector);
  const questionCount = useSelector(numberOfQuestions);
  const questions = useSelector(questionsSelector);

  // dispatchers
  const dispatcher = useDispatch();

  // functions
  const reset = (): void => {
    dispatcher(fetchQuestions());
    navigation.popToTop();
  };
  const questionList: ReactElement = questions.map(
    (ele: Question, index: number) => (
      <Answer key={ele.question} question={ele} index={index} />
    )
  );

  // react-effects
  useEffect(() => {
    setTimeout(() => {
      heightAnimator.start();
    }, 1000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.textStyle}>You Scored</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>{`${score}/${questionCount}`}</Text>
        </View>
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            height: heightAnimated.interpolate({
              inputRange: [0, 100],
              outputRange: ["10%", "80%"],
            }),
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {questionList}
        </ScrollView>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button action={reset}>
          <Text style={styles.buttonText}>PLAY AGAIN?</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    flexDirection: "column",
    alignSelf: "center",
    margin: 5,
    justifyContent: "space-between",
    width: "98%",
  },
  content: {
    alignSelf: "auto",
    backgroundColor: "transparent",
    flexDirection: "column",
    padding: 3,
    justifyContent: "space-between",
    minHeight: 60,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginBottom: 7,
    marginHorizontal: 10,
  },
  header: {
    backgroundColor: "white",
    elevation: 2,
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
    minHeight: 60,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  scrollView: {
    backgroundColor: "white",
    elevation: 2,
    flexDirection: "column",
    minHeight: 60,
    shadowColor: "black",
    width: "100%",
    borderRadius: 5,
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  scrollViewContainer: {
    alignItems: "center",
    margin: 10,
    justifyContent: "space-evenly",
  },
});

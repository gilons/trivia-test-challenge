import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { fetchQuestions } from "../screens/question/slice";

export const GameContainer = ({ children }: any): ReactElement => {
  // refs
  const animatedHeight: Animated.Value = React.useRef(new Animated.Value(200))
    .current;

  // react-redux dispatcher
  const dispatch = useDispatch();

  // effects
  React.useEffect(() => {
    dispatch(fetchQuestions());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(animatedHeight, {
        toValue: height * 0.8,
        easing: Easing.elastic(5),
        useNativeDriver: false,
        duration: 1200,
      }).start();
    }, 350);
  }, []);

  return (
    <View style={styles.showView}>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        style={[styles.animatedContainerView, { height: animatedHeight }]}
      >
        <View style={styles.childContainer}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
};

const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  showView: {
    shadowColor: "black",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
    shadowOpacity: 0.8,
    overflow: "hidden",
    elevation: 3,
    shadowRadius: 5,
    alignSelf: "center",
    width: "97%",
    shadowOffset: { width: 0, height: 0 },
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    maxHeight: "100%",
    backgroundColor: "white",
  },
  animatedContainerView: {
    minHeight: 100,
  },
  childContainer: {
    height: height * 0.8,
  },
});

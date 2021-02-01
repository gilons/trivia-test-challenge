import React, { ReactElement, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

// types
type TimeProps = {
  time: string;
  color: string;
  canBlink: boolean;
};

export const QuestionTime = ({
  time,
  color,
  canBlink = false,
}: TimeProps): ReactElement => {
  // react-refs
  const blinker = useRef(new Animated.Value(1)).current;
  const blinking = useRef(false);
  const blink = useRef(
    Animated.loop(
      Animated.timing(blinker, {
        toValue: 0,
        useNativeDriver: false,
        duration: 300,
      })
    )
  ).current;

  // functions
  const startBlinker = ():void => {
    blink.start();
  };
  const stopBlinker = ():void => {
    blink.reset();
    blink.stop();
  };

  // react effects
  useEffect(() => {
    if (canBlink && !blinking.current) {
      blinking.current = true;
      startBlinker();
    } else if (!canBlink && blinking.current) {
      blinking.current = false;
      stopBlinker();
    }
  }, [canBlink]);

  return (
    <Animated.View
      style={[
        styles.textContainer,
        { backgroundColor: color, opacity: blinker },
      ]}
    >
      <Text style={styles.timerText}>{time}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginRight: 5,
    elevation: 1,
    minWidth:60,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.4,
    borderRadius: 15,
    marginBottom: 2,
    padding: 3,
    backgroundColor: "white",
  },
  timerText: {
    color: "white",
    fontWeight: "bold",
  },
});

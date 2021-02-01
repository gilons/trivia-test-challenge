import React, { ReactElement, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

// types
type TypeWriterPropsType = {
  text: string;
  duration?: number;
  style: object;
  disabled?: boolean;
  started?: boolean | number;
  onEnd?: any;
};
export const TypeWriter = ({
  text = "",
  duration = 200,
  style = {},
  disabled,
  started = true,
  onEnd = () => {},
}: TypeWriterPropsType): ReactElement => {
  // refs
  const index = useRef(0);
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const interval: any = useRef(null);
  const opacityAnimator = useRef(
    Animated.loop(
      Animated.timing(animatedOpacity, {
        duration: 500,
        useNativeDriver: false,
        toValue: 1,
      })
    )
  ).current;

  // states
  const [displayedText, setDisplayedText] = useState(disabled ? text : "");
  const [typing, setTyping] = useState(false);

  // effects
  useEffect(() => {
    started && !disabled && opacityAnimator.start();
  }, [started]);
  useEffect(() => {
    if (started && !interval.current && !disabled) {
      setTyping(true);
      interval.current = setInterval(() => {
        if (index.current >= text.length) {
          opacityAnimator.reset();
          animatedOpacity.setValue(0);
          clearInterval(interval.current);
          setTyping(false);
          onEnd();
        } else {
          setDisplayedText(text.slice(0, index.current + 1));
          index.current += 1;
        }
      }, duration);
      return () => clearInterval(interval.current);
    }
  }, [started]);

  return (
    <View
      style={[styles.mainContainer, { borderBottomWidth: typing ? 1.5 : 0 }]}
    >
      <Text style={style}>
        {displayedText}
        <Animated.Text style={[{ opacity: animatedOpacity }]}>
          {typing ? "|" : ""}
        </Animated.Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minWidth: 150,
    maxWidth: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

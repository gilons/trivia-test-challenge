import React, { ReactElement, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { QuestionTime } from "./Time";

/**
 * types
 */
type TimerProp = {
  duration?: number;
  onEnd: Function;
};

export const QuestionTimer = ({
  duration = 50000,
  onEnd = () => {},
}: TimerProp): ReactElement => {
  // react refs
  const widthRef = useRef(100);
  const progressRef = useRef(0);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const CurrentTime = useRef(0);

  // react states
  const [color, setColor] = React.useState("green");
  const [time, setTime] = React.useState('0:00 / 0:00');
  const [canBlink, setCanBlink] = React.useState(false);

  // functions
  const setWidth = (e: LayoutChangeEvent): void => {
    widthRef.current = e.nativeEvent.layout.width;
  };
  const setProgress = (e: LayoutChangeEvent): void => {
    progressRef.current = e.nativeEvent.layout.width;
    setProgressState(progressRef.current, widthRef.current);
  };
  const setCurrentTime = (portion: number): void => {
    CurrentTime.current = portion * duration;
  };
  const setProgressState = (val: number, max: number): void => {
    const percentageProgress = val / max;
    setCurrentTime(percentageProgress);
    if (percentageProgress >= 1) {
      setCanBlink(false);
    }
    if (percentageProgress > 0.9) {
      setColor("red");
      setCanBlink(true);
    } else if (percentageProgress > 0.7) {
      setColor("orange");
    } else {
      setColor("green");
    }
  };
  const formatDurationToTime = (time: number): string => {
    const seconds = (time || 100) / 1000;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
      .filter(Boolean)
      .join(":");
  };
  const returnCurrentTime = (): string => {
    return `${formatDurationToTime(
      CurrentTime.current
    )} / ${formatDurationToTime(duration)}`;
  }

  // effects
  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: duration,
      duration,
      useNativeDriver: false,
    }).start(() => onEnd());
  }, []);
  useEffect(() => {
    const timing = setInterval(() => {
      const timeString = returnCurrentTime();
      setTime(timeString);
    }, 1000);
    return () => clearInterval(timing);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <QuestionTime time={time} color={color} canBlink={canBlink} />
      <View style={styles.progressContainer} onLayout={setWidth}>
        <Animated.View
          onLayout={setProgress}
          style={[
            styles.loader,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, duration],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 30,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  progressContainer: {
    height: 10,
    width: "100%",
    overflow: "hidden",
    borderRadius: 5,
  },
  loader: {
    backgroundColor: "green",
    height: "100%",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 1,
  },
});

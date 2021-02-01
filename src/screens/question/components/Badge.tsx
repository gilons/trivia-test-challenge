import React, { ReactElement } from "react";
import { View, StyleSheet } from "react-native";

export const BadgeRibbon = (): ReactElement => {
  return (
    <View style={styles.badgeRibbon}>
      <View style={styles.badgeRibbonCircle} />
      <View style={styles.badgeRibbonNeg140} />
      <View style={styles.badgeRibbon140} />
    </View>
  );
};

const styles = StyleSheet.create({
  badgeRibbon: {},
  badgeRibbonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#F77D6F",
    borderRadius: 25,
  },
  badgeRibbon140: {
    backgroundColor: "transparent",
    borderBottomWidth: 20,
    borderBottomColor: "#F77D6F",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightWidth: 40,
    borderRightColor: "transparent",
    position: "absolute",
    top: 21,
    right: -10,
    transform: [{ rotate: "-113deg" }],
  },
  badgeRibbonNeg140: {
    backgroundColor: "transparent",
    borderBottomWidth: 20,
    borderBottomColor: "#F77D6F",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightWidth: 40,
    borderRightColor: "transparent",
    position: "absolute",
    top: 21.5,
    left: -5,
    transform: [{ rotate: "-65deg" }, { rotateX: "180deg" }],
  },
});

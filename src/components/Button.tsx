import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// types
type ButtonPropType = {
  action: any;
  children: ReactElement;
};

export const Button = ({ children, action }: ButtonPropType): ReactElement => {
  return (
    <TouchableOpacity onPress={action} style={styles.buttonContainer}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    minWidth: 100,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.4,
    margin: 5,
    justifyContent: "center",
    textAlign: "center",
  },
});

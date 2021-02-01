import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { useSelector } from "react-redux";
import { questionsSelector } from "../question/slice";

export const Home = ({ navigation }: any): ReactElement => {
  // react-redux selectors
  const questionsCount = useSelector(questionsSelector).length;

  // unctions
  const start = () => {
    navigation.navigate("question");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeTitle}>
          <View>
            <Text style={styles.title}>
              {"Welcome to the Trivia Challenge"}
            </Text>
          </View>
        </View>
        <View style={styles.instructions}>
          <Text style={styles.textStyle}>
            {"You will be presented with 10 True or False questions"}
          </Text>
        </View>
        <View style={styles.challenge}>
          <Text style={styles.textStyle}>{"Can you score 100%"}</Text>
        </View>
        <View style={styles.begin}>
          {questionsCount > 0 ? (
            <Button action={start}>
              <Text style={[styles.textStyle, styles.buttonText]}>BEGIN</Text>
            </Button>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    fontSize: 25,
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  welcomeContainer: {
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    height: "101%",
    padding: 5,
    flexDirection: "column",
    marginHorizontal: 40,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  welcomeTitle: {
    textAlign: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  instructions: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "center",
  },
  challenge: {
    flexDirection: "column",
    justifyContent: "flex-end",
    textAlign: "center",
    alignItems: "center",
  },
  begin: {
    flexDirection: "column",
    marginBottom: 10,
    minHeight: 60,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

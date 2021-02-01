import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BadgeRibbon } from "./Badge";

export const QuestionHeader = ({ category, difficulty }: any):ReactElement => {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text ellipsizeMode={"tail"} style={styles.title} numberOfLines={2}>
          {category}
        </Text>
      </View>
      <View>
        <BadgeRibbon />
        <View style={styles.difficultyContainer}>
          <Text style={styles.difficultyText}>{difficulty}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height:50,
    padding:5,
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowRadius: 5,
    elevation: 2,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  difficultyContainer:{
      position:'absolute',
      width:40,
      height:40,
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
  },
  difficultyText:{
    fontWeight:'bold',
    color:'white'
  }
});

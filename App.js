import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';

const {width, height} = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Text style={styles.textTitle}>My To Do</Text>
      <View style={styles.containerCard}>
        <TextInput style={styles.input} placeholder={"New To Do"}></TextInput>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  textTitle: {
    color: "white",
    fontSize: 30,
    marginTop: 45,
    marginBottom: 25,
    fontFamily: "sans-serif-light",
  },
  containerCard: {
    backgroundColor: "white",
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    ...Platform.select({
      ios: {
        shadowColor: "rgba(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          heigth: -1,
          width: 0
        },
      },
      android: {
        elevation: 5,
      }
    })
  }
});

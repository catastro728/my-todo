import React from "react"
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native"
import Todo from "./Todo"

const { width, height } = Dimensions.get("window")

export default class App extends React.Component {
  state = {
    newTodo: ""
  }

  render() {
    const { newTodo } = this.state

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.textTitle}>My To Do</Text>
        <View style={styles.containerCard}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newTodo}
            onChangeText={this._controlNewTodo}
            autoCorrect={false}
            returnKeyType={"done"}
          ></TextInput>
          <ScrollView contentContainerStyle={styles.todos}>
            <Todo text={"Hello I'm a To Do"} />
          </ScrollView>
        </View>
      </View>
    )
  }

  _controlNewTodo = text => {
    this.setState({
      newTodo: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
  },
  textTitle: {
    color: "white",
    fontSize: 30,
    marginTop: 45,
    marginBottom: 25,
    fontFamily: "sans-serif-light"
  },
  containerCard: {
    backgroundColor: "white",
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          heigth: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    fontSize: 23
  },
  todos: {
    alignItems: "center"
  }
})

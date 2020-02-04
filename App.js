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
import { AppLoading } from "expo"
import Todo from "./Todo"
import uuidv1 from "uuid/v1"

const { width, height } = Dimensions.get("window")

export default class App extends React.Component {
  state = {
    newTodo: "",
    isLoadTodos: false,
    todos: ""
  }

  componentDidMount = () => {
    this._loadTodos()
  }

  render() {
    const { newTodo, loadTodos, todos } = this.state
    console.log(todos)

    if (loadTodos == false) {
      return <AppLoading />
    }

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
            onSubmitEditing={this._addTodo}
          ></TextInput>
          <ScrollView contentContainerStyle={styles.todos}>
            {Object.values(todos).map(todo => (
              <Todo
                key={todo.id}
                {...todo}
                delTodo={this._delTodo}
                uncompleteTodo={this._uncompleteTodo}
                completeTodo={this._completeTodo}
                updateTodo={this._updateTodo}
              />
            ))}
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
  _loadTodos = () => {
    this.setState({
      isLoadTodos: true
    })
  }
  _addTodo = () => {
    const { newTodo } = this.state
    if (newTodo !== "") {
      this.setState(prevState => {
        const ID = uuidv1()
        const newTodoObj = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now()
          }
        }
        const newState = {
          ...prevState,
          newTodo: "",
          todos: {
            ...prevState.todos,
            ...newTodoObj
          }
        }
        return { ...newState }
      })
    }
  }
  _delTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos
      delete todos[id]

      const newState = {
        ...prevState,
        ...todos
      }
      console.log(newState)
      return { ...newState }
    })
  }
  _uncompleteTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false
          }
        }
      }
      return { ...newState }
    })
  }
  _completeTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true
          }
        }
      }
      return { ...newState }
    })
  }
  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            text: text
          }
        }
      }
      return { ...newState }
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

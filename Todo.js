import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"
import PropTypes from "prop-types"
import { Updates } from "expo"

const { width, heigth } = Dimensions.get("window")

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      todoValue: props.text
    }
  }

  static PropTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    delTodo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
  }

  render() {
    const { isEditing, todoValue } = this.state
    const { text, id, delTodo, isCompleted } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.colum}>
          {isEditing ? (
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            ></View>
          ) : (
            <TouchableOpacity onPress={this._toggleComplete}>
              <View
                style={[
                  styles.circle,
                  isCompleted ? styles.completedCircle : styles.uncompletedCircle
                ]}
              ></View>
            </TouchableOpacity>
          )}

          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              value={todoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finishEdition}
            />
          ) : (
            <Text
              style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}
            >
              {text}
            </Text>
          )}
        </View>

        {isEditing ? (
          <View style={styles.action}>
            <TouchableOpacity onPressOut={this._finishEdition}>
              <View style={styles.containerAction}>
                <Text style={styles.textAction}>✔</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.action}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.containerAction}>
                <Text style={styles.textAction}>🖋</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={event => {
                event.stopPropagation
                delTodo(id)
              }}
            >
              <View style={styles.containerAction}>
                <Text style={styles.textAction}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  _toggleComplete = event => {
    event.stopPropagation()
    const { isCompleted, completeTodo, uncompleteTodo, id } = this.props
    if (isCompleted) {
      uncompleteTodo(id)
    } else {
      completeTodo(id)
    }
  }
  _startEditing = event => {
    event.stopPropagation()
    const { text } = this.props
    this.setState({
      isEditing: true,
      todoValue: text
    })
  }
  _finishEdition = event => {
    event.stopPropagation()
    const { todoValue } = this.state
    const { id, updateTodo } = this.props
    updateTodo(id, todoValue)

    this.setState({
      isEditing: false
    })
  }
  _controlInput = text => {
    this.setState({ todoValue: text })
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  colum: {
    flexDirection: "row",
    alignItems: "center",

    width: width / 2
    // backgroundColor: "yellow"
  },
  text: {
    fontSize: 18,
    fontFamily: "sans-serif-medium",
    marginVertical: 12
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderColor: "#27536B",
    borderWidth: 5,
    marginRight: 20,
    marginLeft: 5
  },
  completedCircle: {
    borderColor: "gray"
  },
  uncompletedCircle: {
    borderColor: "#27536B"
  },
  completedText: {
    color: "gray",
    textDecorationLine: "line-through"
  },
  action: {
    flexDirection: "row"
    //backgroundColor: "yellow"
  },
  containerAction: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  textAction: {},
  input: {
    marginVertical: 12
  }
})

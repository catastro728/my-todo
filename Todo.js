import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"

const { width, heigth } = Dimensions.get("window")

export default class Todo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false,
    todoValue: ""
  }

  render() {
    const { isCompleted, isEditing, todoValue } = this.state
    const { text } = this.props

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
              style={[styles.input, styles.text]}
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
            <TouchableOpacity>
              <View style={styles.containerAction}>
                <Text style={styles.textAction}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      }
    })
  }
  _startEditing = () => {
    const { text } = this.props
    this.setState({
      isEditing: true,
      todoValue: text
    })
  }
  _finishEdition = () => {
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
    justifyContent: "space-between",
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
    borderColor: "red",
    borderWidth: 5,
    marginRight: 20,
    marginLeft: 5
  },
  completedCircle: {
    borderColor: "gray"
  },
  uncompletedCircle: {
    borderColor: "red"
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

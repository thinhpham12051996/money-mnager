import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { colors } from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { windowWidth } from '../utils/deviceInfo';


const TextInputCom = ({ title, style, value, inputRef, type, placeholder, from, ...inputProps }) => {

  const [state, setState] = useState({
    focused: false
  })

  handleFocus = () => {
    setState({ focused: true })
  }

  handleBlur = () => {
    setState({ focused: false })
  }
  const { focused } = state

  console.log("===>", title)

  return (
    <View style={[type == "login" ? null : styles.container]}>
      <Text style={[type == "Date" ? styles.dateTitleStyle : styles.titleStyle]}>{title}</Text>
      <View style={{ justifyContent: "center" }}>
        <TextInput
          ref={inputRef}
          autoCorrect={false}
          autoCapitalize='none'
          underlineColorAndroid='transparent'
          value={value}
          onBlur={() => handleBlur()}
          onFocus={() => handleFocus()}
          style={[type == "Date" ? styles.dateOfBirth : styles.input, style]}
          placeholder={placeholder}
          {...inputProps}
        />
      </View>
    </View>
  )
}

export default TextInputCom

const inputCom = {
  marginTop: 15,
  height: 45,
  fontSize: 13,
  backgroundColor: "#fff",
  borderRadius: 10,

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6
  },
  titleStyle: {
    color: "#000",
    marginHorizontal: 28
  },
  dateTitleStyle: {
    color: "#000",
    fontSize: 13
  },
  input: {
    ...inputCom,
    marginHorizontal: 25,
    paddingHorizontal: 15

  },
  dateOfBirth: {
    ...inputCom,
    width: windowWidth / 3 - 27,
    marginHorizontal: 5,
    alignItems: "center"
  }

})
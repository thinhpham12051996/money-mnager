import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import TextInputCom from '../components/TextInputCom'
import { colors } from '../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { validateEmail, validatePassword } from '../utils/validators';
import WrongInputWarning from '../components/WrongInputWarning';


const SignIn = ({ navigation }) => {

  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = state
  const [errorText, setErrorText] = useState(null)
  const [saving, setSaving] = useState(false)

  const valid = () => {
    if (state.name?.trim() === '') {
      setErrorText("please enter your name")
      nameInput.focus()
      return false
    }
    if (!validateEmail(state.email)) {
      const errorText = state.email.trim() === '' ? 'Please enter an e-mail' : 'Enter a valid email address'
      setErrorText(errorText)
      emailInput.focus();
      return false
    } if (state.password?.trim() === '') {
      setErrorText("please enter password")
      passwordInput.focus()
      return false
    }
    return true
  }
  const submit = () => {
    if (!valid()) {
      return
    }
    setSaving({ saving: true });
    Keyboard.dismiss();
    setState({ name: "" })
    setErrorText(false)
    navigation.navigate('Home')
  }
  return (
    <View style={styles.containar}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "space-between", paddingBottom: 80 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons style={{ marginTop: 15, marginHorizontal: 20 }} name={"md-arrow-back-outline"} size={25} color={"#000"} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={{ marginHorizontal: 25 }} >
            <Text style={{ color: "#000", fontWeight: 600, fontSize: 22, }}>CREATE</Text>
            <Text style={{ color: "#000", fontWeight: 600, fontSize: 22, marginBottom: 20 }}>ACCOUNT</Text>
          </TouchableOpacity>
          {errorText && (
            <WrongInputWarning warningText={errorText} />
          )}
          <TextInputCom title={"Name"}
            inputRef={(e) => { nameInput = e; }}
            placeholder={"Enter you Name"}
            returnKeyType={'next'}
            onChangeText={name => setState({ ...state, name })}
            value={name}
            onSubmitEditing={() => { emailInput.focus(); }}
          />
          <TextInputCom title={"Email"}
            inputRef={(e) => { emailInput = e; }}
            placeholder={"Enter you Email address"}
            returnKeyType={'next'}
            onChangeText={email => setState({ ...state, email })}
            value={email}
            onSubmitEditing={() => { passwordInput.focus(); }}
          />
          <TextInputCom from={"password"} title={" Password"}
            inputRef={(e) => { passwordInput = e; }}
            placeholder={"Confirm your New Password"}
            style={styles.textInput}
            returnKeyType={'next'}
            onChangeText={password => setState({ ...state, password })}
            value={password}
          // onSubmitEditing={() => { submit(); }}
          />

          <TouchableOpacity title={"Submit"} onPress={() => submit()} style={styles.buttonStyle}>
            <Text style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  containar: {
    flex: 1,

  },
  buttonStyle: {
    color: "#000"
  },
  buttonStyle: {
    backgroundColor: colors.statusBar,
    marginHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 25
  }
})
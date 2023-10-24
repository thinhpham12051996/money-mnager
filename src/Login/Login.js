import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import TextInputCom from '../components/TextInputCom'
import { colors } from '../constants/colors'
import { validateEmail } from '../utils/validators'
import WrongInputWarning from '../components/WrongInputWarning'


const Login = ({ navigation }) => {

  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const { email, password } = state
  const [errorText, setErrorText] = useState(null)
  const [saving, setSaving] = useState(false)

  const valid = () => {
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
    // Keyboard.dismiss();
    setState({ name: "" })
    setErrorText(false)
    navigation.navigate('Home')
  }
  return (
    <View style={styles.containar}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "flex-end", paddingBottom: 60 }}>
        <TouchableOpacity style={{ marginHorizontal: 25 }} >
          <Text style={{ color: "#000", fontWeight: 600, fontSize: 22, marginVertical: 20 }}>LOGIN</Text>
        </TouchableOpacity>
        {errorText && (
          <WrongInputWarning warningText={errorText} />
        )}
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

        <TouchableOpacity title={"Submit"} onPress={() => [submit()]} style={styles.buttonStyle}>
          <Text style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20, marginBottom: 20 }}>
          <TouchableOpacity>
            <Text style={{ color: colors.darkGray, marginRight: 10 }}>Don't have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{ color: colors.blue, fontWeight: 500 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    justifyContent: "flex-end",

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
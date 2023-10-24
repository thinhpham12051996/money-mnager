import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Calculator, CalculatorInput } from 'react-native-calculator'

const cal = () => {
  return (
    <View style={{ flex: 1 }}>
      <Calculator style={{ flex: 1, backgroundColor: "#000" }}
        fieldTextStyle={{ color: "#000" }}
        fieldContainerStyle={{ backgroundColor: "#000" }}
      />
      {/* <CalculatorInput
        fieldTextStyle={{ fontSize: 24 }}
        fieldContainerStyle={{ height: 36 }}
      /> */}
    </View>
  )
}

export default cal

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../constants/colors';

const BudgetCom = () => {
  return (
    <View style={styles.budgetContaint}>
      <Entypo style={styles.iconStyle} name={'graduation-cap'} size={30} color={"#000"} />
      <View style={{ flex: 1, marginRight: 10 }}>
        <Text style={styles.budgetText}>Bills</Text>
        <Text style={styles.budgetText}>Limits: RM100.00</Text>
        <Text style={styles.budgetText}>spent: RM50.00</Text>
        <Text style={styles.budgetText}>Remaining: RM90.00</Text>
        <View style={styles.budgetborder}></View>
        <Text style={styles.budgetText}>Congrats! You are still whithin budget.</Text>
      </View>
    </View>
  )
}

export default BudgetCom

const styles = StyleSheet.create({
  budgetContaint: {
    flexDirection: "row",
    // marginHorizontal: 10,
    marginTop: 15,
    borderBottomColor: colors.backColor,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  iconStyle: {
    marginHorizontal: 10

  },
  budgetText: {
    color: "#000",
    fontSize: 16
  },
  budgetborder: {
    borderBottomColor: "green",
    borderBottomWidth: 8,
    borderRadius: 5,
    marginVertical: 10
  }
})
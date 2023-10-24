import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { windowWidth } from '../utils/deviceInfo';
import { colors } from '../constants/colors';

const HistoryCom = ({ month, setMonth, incomePress, expensePress, incomeTotal, expenseTotal }) => {

  const handlePreviousPrevPress = (actiontype) => {
    console.log("actiontype", actiontype)
    if (actiontype === "prev" && moment(month).isAfter(moment('1900-01-01'), 'month')) {
      setMonth(moment(month).subtract(1, 'month'))
    } else if (actiontype === "longBefore" && moment(month).isAfter(moment('1900-01-01'), 'month'))
      setMonth(moment(month).subtract(12, 'month'))
  }

  const handlePreviousNextPress = (actiontype) => {
    console.log("actiontype", actiontype)
    if (actiontype === "next" && moment(month).isBefore(moment(), "month")) {
      setMonth(moment(month).add(1, 'month'))
    } else if (actiontype === "longAfter" && moment(month).isBefore(moment(), 'month'))
      setMonth(moment(month).add(12, 'month'))
  }

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => handlePreviousPrevPress("prev")} onLongPress={() => handlePreviousPrevPress("longBefore")} >
          <MaterialIcons style={styles.infoIcon} name={'keyboard-arrow-left'} size={30} color={"#000"} />
        </TouchableOpacity>
        <Text style={styles.rightText}>{moment(month).format('MMM YYYY')}</Text>
        <TouchableOpacity onPress={() => handlePreviousNextPress("next")} onLongPress={() => handlePreviousNextPress("longAfter")}>
          <MaterialIcons style={styles.infoIcon} name={'keyboard-arrow-right'} size={30} color={"#000"} />
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistContaint}>
        <TouchableOpacity onPress={incomePress} style={styles.incomeContaint}>
          <Text style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>INCOME</Text>
          <Text style={{ marginTop: 5, color: "#fff", fontWeight: 600 }}>{incomeTotal}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={expensePress} style={styles.expenseContaint}>
          <Text style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>EXPENSE</Text>
          <Text style={{ marginTop: 5, color: "#fff", fontWeight: 600 }}>{expenseTotal}</Text>
        </TouchableOpacity>
        <View style={styles.totalContaint}>
          <Text style={{ fontSize: 16, color: "#fff", fontWeight: 600 }}>Total</Text>
          <Text style={{ marginTop: 5, color: "#fff", fontWeight: 600 }}> {incomeTotal - expenseTotal}</Text>
        </View>
      </View>

    </View>
  )
}

export default HistoryCom

const historyCom = {
  width: windowWidth * 0.28,
  height: windowWidth * 0.20,
  backgroundColor: "#08C805",
  marginHorizontal: 10,
  marginVertical: 20,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
}

const styles = StyleSheet.create({
  rightText: {
    marginHorizontal: 30,
    color: "#000",
    fontSize: 18
  },
  flatlistContaint: {
    borderBottomColor: colors.backColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    flexDirection: "row"
  },
  incomeContaint: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.20,
    backgroundColor: "#08C805",
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",

  },
  incomeContaint: {
    ...historyCom,
    backgroundColor: "#01BDFF",
  },
  expenseContaint: {
    ...historyCom,
    backgroundColor: "#01BDFF",
  },
  totalContaint: {
    ...historyCom,
    backgroundColor: "#01BDFF",
  }
})
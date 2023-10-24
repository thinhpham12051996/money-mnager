import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit'
import { windowWidth } from '../utils/deviceInfo'


const PieChartCom = ({ incomeTotal, expenseTotal }) => {

  const data = [
    {
      name: "Income",
      population: incomeTotal,
      color: "rgba(131, 167, 234, 1)",
      legendFontSize: 15
    },
    {
      name: "Expense",
      population: expenseTotal,
      color: "#F00",
      legendFontSize: 15
    },


  ];
  return (
    <View >
      <PieChart
        style={{}}
        data={data}
        width={windowWidth}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#000",
          backgroundGradientTo: "#000",
          fillShadowGradient: '#91D4F9',
          fillShadowGradientOpacity: 1,
          barPercentage: 1,
          color: () => "#91D4F9",
          labelColor: () => `#fff`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 5]}
      />
    </View>
  )
}

export default PieChartCom

const styles = StyleSheet.create({})
import AsyncStorage from '@react-native-async-storage/async-storage';

export const incomeTotalHandler = async () => {
  const income = JSON.parse(await AsyncStorage.getItem("income"))
  var total = 0
  if (income && income.length > 0) {
    income.map((inc) => {
      total += parseFloat(inc.amount)
    })
  }
  return total
}

export const expenseTotalHandler = async () => {
  const expense = JSON.parse(await AsyncStorage.getItem("expense"))
  var total = 0
  if (expense && expense.length > 0) {
    expense.map((inc) => {
      total += parseFloat(inc.amount)
    })
  }
  return total
}

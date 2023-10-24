import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { colors } from '../constants/colors'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { windowHeight, windowWidth } from '../utils/deviceInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'
import Toast, { ErrorToast } from 'react-native-toast-message';
import moment from 'moment';
import { incomeIconeHandler } from '../constants/dataCom';
import uuid from 'react-native-uuid';

const Calculator = ({ navigation, route }) => {

  const category = route?.params?.category || ''
  const titles = route?.params?.title || 'Categories'
  const icones = route?.params?.icone || 'md-arrow-redo-sharp'
  const categoryId = route?.params?.id || ''
  const [title, setTitle] = useState(titles || 'Categories')
  const [icone, setIcone] = useState(icones || 'md-arrow-redo-sharp')
  const [result, setResult] = useState('')
  const [isSelect, setSelect] = useState('income')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  useEffect(() => {
    if (category) {
      setSelect(category)
      setTitle(titles || "Categories")
      setIcone(icones || "md-arrow-redo-sharp")
    }
  }, [category])

  const saveData = async () => {
    var id = uuid.v4()
    var date = new Date(selectedDate)
    const total = result === '' ? "00" : result
    if (title !== 'Categories') {
      if (isSelect === "income") {
        var income = JSON.parse(await AsyncStorage.getItem("income"))
        if (!income) income = [{ amount: total, categoryId: categoryId, date: date, id: id }]
        else income.push({ amount: total, categoryId: categoryId, date: date, id: id })
        await AsyncStorage.setItem('income', JSON.stringify(income))
      } else if (isSelect === "expense") {
        console.log("date==>>", date)
        var expense = JSON.parse(await AsyncStorage.getItem("expense"))
        if (!expense) expense = [{ amount: total, categoryId: categoryId, date: date, id: id }]
        else expense.push({ amount: total, categoryId: categoryId, date: date, id: id })
        await AsyncStorage.setItem('expense', JSON.stringify(expense))
      }
      navigation.goBack()
    } else {
      Toast.show({
        type: 'error',
        text1: 'please select categories',
      })
    }
  }

  const incomehandler = () => {
    setTitle("Categories")
    setIcone("md-arrow-redo-sharp")
  }
  const calculate = (title, type) => {
    if ((type == 'symbol' && result) || (type != 'symbol')) {
      var lastChar = result.slice(-1)
      if ((!isNaN(lastChar)) || type != 'symbol') {
        if (title == '=') {
          setResult(eval(result))
        } else setResult(result + title)
      }
    }
  }

  const removeHandler = (press) => {
    if (press === "press") {
      setResult(result.toString().slice(0, -1))
    } else if (press === "longPress") {
      setResult("")
    }
  }

  const Btn = ({ title, type }) => {
    return (
      <TouchableOpacity onPress={() => calculate(title, type)} style={type === "symbol" ? [styles.calculatorButton, { backgroundColor: "#5B9AF6" }] : [styles.calculatorButton, { backgroundColor: "#343434" }]}>
        <Text style={{ fontSize: 30, color: "#fff" }}>{title}</Text>
      </TouchableOpacity>)
  }

  return (
    <View style={styles.containt}>
      <ScrollView contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1 }}>
        <View>
          <View style={styles.topContaint}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "#000" }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => saveData()}>
              <Text style={{ color: "#000" }}>SAVE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.incomeContaint}>
            <TouchableOpacity style={[styles.incomeStyle, { borderWidth: 1, borderColor: isSelect == "income" ? "#000" : "#fff" }]} onPress={() => [setSelect("income"), incomehandler()]}  >
              <Text style={{ color: "#000", fontSize: 16 }}>INCOME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.incomeStyle, { borderWidth: 1, borderColor: isSelect == "expense" ? "#000" : "#fff" }]} onPress={() => [setSelect("expense"), incomehandler()]}>
              <Text style={{ color: "#000", fontSize: 16 }}>EXPENSE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.accountContaint}>
            <TouchableOpacity style={styles.accountStyle} onPress={() => setOpen(true)} >
              <Entypo style={styles.plusIcon} name={'calendar'} size={20} color={"#000"} />
              <Text style={{ color: "#000", marginLeft: 5 }}>{moment(selectedDate).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode={"date"}
              open={open}
              date={selectedDate}
              onConfirm={(date) => {
                setOpen(false)
                setSelectedDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
            <TouchableOpacity style={styles.accountStyle} onPress={() => [navigation.navigate('IncomeCategories', isSelect,)]} >
              {
                incomeIconeHandler(title === 'Categories' ? "arrow-redo-sharp" : icones)
              }
              <Text style={{ color: "#000", marginLeft: 5 }}>{title}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Toast
          onPress={() => Toast.hide()}
          config={{
            error: (props) => (
              <ErrorToast
                {...props}
                text1Style={{
                  fontSize: 15
                }}
              />
            )
          }} />

        <View>
          <View style={styles.resultStyle}>
            <Text style={styles.resultText}>
              {result}
            </Text>
            <TouchableOpacity onLongPress={() => removeHandler("longPress")} onPress={() => removeHandler("press")}>
              <Ionicons style={{ marginLeft: 10 }} name={'md-backspace-outline'} size={25} color={"#fff"} />
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: "row", flexWrap: "wrap", paddingVertical: 1,
            paddingHorizontal: 1, backgroundColor: "#000",
          }}>
            <Btn title={"+"} type="symbol" />
            <Btn title={7} />
            <Btn title={8} />
            <Btn title={9} />
            <Btn title={"-"} type="symbol" />
            <Btn title={4} />
            <Btn title={5} />
            <Btn title={6} />
            <Btn title={"*"} type="symbol" />
            <Btn title={1} />
            <Btn title={2} />
            <Btn title={3} />
            <Btn title={"/"} type="symbol" />
            <Btn title={0} />
            <Btn title={"."} type="symbol" />
            <Btn title={"="} type="symbol" />
          </View>
        </View>
      </ScrollView>

    </View>
  )
}
const backComStyle = {
  backgroundColor: colors.backColor,
  paddingHorizontal: 10,
  paddingVertical: 2,
  borderRadius: 6
}
export default Calculator

const styles = StyleSheet.create({
  containt: {
    flex: 1,
  },
  topContaint: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
    marginHorizontal: 10,
    marginBottom: 50
  },
  incomeContaint: {
    justifyContent: "space-around",
    flexDirection: "row",
    borderBottomColor: colors.backColor,
    borderBottomWidth: 1,
    paddingBottom: 30
  },
  incomeStyle: {
    ...backComStyle,
    flexDirection: "row"
  },
  accountContaint: {
    justifyContent: "space-around",
    flexDirection: "row",
    borderBottomColor: colors.backColor,
    marginVertical: 20
  },
  accountStyle: {
    flexDirection: "row",
    alignItems: "center",
    ...backComStyle
  },
  resultStyle: {
    backgroundColor: "#000",
    width: windowWidth,
    height: 100,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  resultText: {
    alignSelf: "center",
    fontSize: 40,
    color: "#fff"
  },
  calculatorButton: {
    width: windowWidth * 0.23 + 4,
    height: windowHeight * 0.09,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    borderRadius: 10
  }
})
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import TopnavBar from '../../components/TopnavBar'
import { FlatList } from 'react-native-gesture-handler'
import { colors } from '../../constants/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { windowWidth } from '../../utils/deviceInfo'


const Income = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState('0')

  const income = [
    { icone: 'gift-outline', title: "Awards" },
    { icone: 'gift-outline', title: "Refunds" },
    { icone: 'gift-outline', title: "Salary" },
  ]

  const Expense = [
    { icone: 'gift-outline', title: "Beauty" },
    { icone: 'gift-outline', title: "Bills" },
    { icone: 'gift-outline', title: "Education" },
    { icone: 'gift-outline', title: "Entertainment" },
    { icone: 'gift-outline', title: "Food" },
    { icone: 'gift-outline', title: "Gift" },
    { icone: 'gift-outline', title: "Health" },
    { icone: 'gift-outline', title: "Insurance" },
    { icone: 'gift-outline', title: "Rental" },
    { icone: 'gift-outline', title: "Shopping" },
    { icone: 'gift-outline', title: "Sports" },
    { icone: 'gift-outline', title: "Travelling" },
    { icone: 'gift-outline', title: "Transportation" },
  ]

  const calculate = (title) => {
    if (title == "Done") {
      setModalVisible(!modalVisible)
    } else setResult(result + title)
  }

  const removeHandler = (press) => {
    // console.log("=>>>>", press)
    if (press === "press") {
      setResult(result.substring(0, result.length - 1))
    } else if (press === "longPress") {
      setResult("")
    }
  }
  const Btn = ({ title, type }) => {
    return (
      <TouchableOpacity onPress={() => calculate(title)} style={type === "symbol" ? [styles.calculatorButton, { backgroundColor: "#5B9AF6" }] : [styles.calculatorButton, { backgroundColor: "#343434" }]}>
        <Text style={[{ color: "#fff" }, type === "Done" ? { fontSize: 20 } : { fontSize: 25 }]}>{title}</Text>
      </TouchableOpacity >)
  }
  const RemoveBtn = () => {
    return (
      <TouchableOpacity onLongPress={() => removeHandler("longPress")} onPress={() => removeHandler("press")} style={[styles.calculatorButton, { backgroundColor: "#5B9AF6" }]} >
        <Ionicons style={{ marginLeft: 10 }} name={'md-backspace-outline'} size={30} color={"#fff"} />
      </TouchableOpacity >
    )
  }
  return (
    <View style={styles.containt}>
      <TopnavBar />
      <ScrollView >
        <View style={styles.incomeContaint}>
          <Text style={{ color: "#000", fontSize: 20, marginHorizontal: 5 }}>Income Categories</Text>
        </View>
        <FlatList data={income} renderItem={({ item }) => {
          return (
            <View style={styles.incomeList}>
              <View style={styles.incomeicon}>
                <Ionicons style={styles.plusIcon} name={item.icone} size={22} color={"#000"} />
              </View>
              <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between", flex: 1, marginHorizontal: 15 }}>
                <Text style={{ fontSize: 18, color: "#000", }}>{item.title}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <SimpleLineIcons style={styles.plusIcon} name={"plus"} size={25} color={"#000"} />
                </TouchableOpacity>
              </View>
            </View>
          )
        }} />

        <View style={styles.incomeContaint}>
          <Text style={{ color: "#000", fontSize: 20, marginHorizontal: 5 }}>Expense Categories</Text>
        </View>
        <FlatList data={Expense} renderItem={({ item }) => {
          return (
            <View style={styles.incomeList}>
              <View style={styles.incomeicon}>
                <Ionicons style={styles.plusIcon} name={item.icone} size={22} color={"#000"} />
              </View>
              <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "space-between", flex: 1, marginHorizontal: 15 }}>
                <Text style={{ fontSize: 18, color: "#000", }}>{item.title}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <SimpleLineIcons style={styles.plusIcon} name={"plus"} size={25} color={"#000"} />
                </TouchableOpacity>
              </View>
            </View>
          )
        }} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Set Limit</Text>
              <View style={{ flexDirection: "row", marginVertical: 15 }}>
                <Text style={{ color: "#000", fontSize: 18, marginRight: 15 }}>Limit</Text>
                <Text style={{ color: "#000", fontSize: 18, backgroundColor: "#3B88F8", }}>{result}</Text>
              </View>
              <View style={{ flexDirection: "row", }}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 25 }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingHorizontal: 25 }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{
              flexDirection: "row", flexWrap: "wrap", paddingVertical: 5,
              paddingHorizontal: 5, backgroundColor: "#000",
              marginHorizontal: 25, marginTop: 50
            }}>
              <Btn title={1} />
              <Btn title={2} />
              <Btn title={3} />
              <RemoveBtn />
              <Btn title={4} />
              <Btn title={5} />
              <Btn title={6} />
              <Btn title={"Done"} />
              <Btn title={7} />
              <Btn title={8} />
              <Btn title={9} />
              <Btn title={"."} />
              <Btn title={""} />
              <Btn title={0} />
              <Btn title={""} />
              <Btn title={","} />
            </View>
          </View>
        </Modal>


      </ScrollView >
    </View >
  )
}

export default Income

const styles = StyleSheet.create({
  containt: {
    flex: 1,
  },
  incomeContaint: {
    borderBottomColor: colors.backColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 10,

  },
  incomeList: {
    marginHorizontal: 15,
    flexDirection: "row"
  },
  incomeicon: {
    width: 30,
    height: 30,
    backgroundColor: colors.backColor,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  centeredView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    flex: 1,
    marginBottom: 50
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.backColor,
    borderRadius: 20,
    width: 300,
    height: 150,
    alignItems: 'center',
    padding: 20
    // justifyContent: "center"

  },
  modalText: {
    color: "#000",
    fontSize: 25
  },
  calculatorButton: {
    width: windowWidth * 0.18,
    height: windowWidth * 0.16,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
  }
})
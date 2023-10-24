import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import TopnavBar from '../../components/TopnavBar'
import { colors } from '../../constants/colors'
import Entypo from 'react-native-vector-icons/Entypo';

const Information = () => {

  const manage = [
    { title: "Create a budget" },
    { title: "Set financial goals" },
    { title: "Create an emargency fund" },
    { title: "Set financial limits" },
    { title: "Track your expe nses" },
  ]
  const saving = [
    { title: "To build up emergency funds for unforeseen circumstances" },
    { title: "To build up and protect assets against inflation" },
    { title: "To meet any future needs and wants" },
  ]

  return (
    <View style={styles.containrt}>
      <TopnavBar />
      <ScrollView>
        <View style={styles.informationStyle}>
          <Text style={styles.informationText}>Information</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.manageTextContaint}>How to manage your money wisely?</Text>
          <View style={{ borderBottomColor: "#000", borderBottomWidth: 1.5, marginHorizontal: 20, marginBottom: 10 }}></View>
          <FlatList data={manage} renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10 }}>
                <Entypo name="dot-single" size={30} color="#000" />
                <Text style={{ fontSize: 16, color: "#000" }}>{item.title}</Text>
              </View>
            )
          }}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.manageTextContaint}>Importance of Savings</Text>
          <View style={{ borderBottomColor: "#000", borderBottomWidth: 1.5, marginHorizontal: 20, marginBottom: 10, width: 215, alignSelf: "center" }}></View>
          <FlatList data={saving} renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                <Entypo name="dot-single" size={30} color="#000" />
                <Text style={{ fontSize: 16, color: "#000", marginRight: 25, marginVertical: 5 }}>{item.title}</Text>
              </View>
            )
          }}
          />
        </View>
      </ScrollView >
    </View >
  )
}

export default Information

const styles = StyleSheet.create({
  containrt: {
    flex: 1
  },
  informationStyle: {
    paddingHorizontal: 10,
    borderBottomColor: colors.backColor,
    borderBottomWidth: 1,
    paddingBottom: 15
  },
  informationText: {
    fontSize: 20,
    color: "#000"
  },
  manageTextContaint: {
    alignSelf: "center",
    fontWeight: 700,
    fontSize: 20,
    // borderBottomColor: "#000",
    // borderBottomWidth: 1
  }
})
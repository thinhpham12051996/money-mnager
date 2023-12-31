import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopnavBar from '../../components/TopnavBar';
import HistoryCom from '../../components/HistoryCom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  incomeCategories,
  expenseCategories,
  incomeIconeHandler,
} from '../../constants/dataCom';
import PieChartCom from '../../components/PieChartCom';
import {colors} from '../../constants/colors';
import {windowWidth} from '../../utils/deviceInfo';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {
  incomeTotalHandler,
  expenseTotalHandler,
} from '../../constants/functionCom';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Analysis = ({navigation}) => {
  const [inSelect, setInSelect] = useState('income');
  const [addData, setAddData] = useState([]);
  const [month, setMonth] = useState(moment());
  var [incomeTotal, setIncomeTotal] = useState(0);
  var [expenseTotal, setExpenseTotal] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [inSelect, month]),
  );

  const getData = async () => {
    const income = JSON.parse(await AsyncStorage.getItem('income'));
    const expense = JSON.parse(await AsyncStorage.getItem('expense'));
    var incomeArr = [],
      expenseArr = [];
    // if (inSelect === 'income') {
    var total = 0;
    if (income && income.length > 0) {
      incomeArr = income
        .filter(incfilter => {
          return moment(incfilter.date).isSame(month, 'month');
        })
        .map(inc => {
          total += parseFloat(inc.amount);
          const category = incomeCategories.find(
            item => item?.id === inc?.categoryId,
          );
          if (category) inc.category = category;
          return inc;
        });
    }
    setIncomeTotal(total);
    // } else if (inSelect === 'expense') {
    var totals = 0;
    if (expense && expense.length > 0) {
      expenseArr = expense
        .filter(exfilter => {
          return moment(exfilter.date).isSame(month, 'month');
        })
        .map(inc => {
          totals += parseFloat(inc.amount);
          const category = expenseCategories.find(
            item => item?.id === inc?.categoryId,
          );
          if (category) inc.category = category;
          return inc;
        });
    }
    setExpenseTotal(totals);
    setAddData(inSelect === 'income' ? incomeArr : expenseArr);
    // }
  };

  const dateHandler = (item, index) => {
    console.log('prevIncome=>', index);
    if (
      index == 0 ||
      (index !== 0 &&
        !moment(item?.date).isSame(addData?.[index - 1]?.date, 'day'))
    )
      return (
        <Text style={{marginHorizontal: 10, marginTop: 10}}>
          {moment(item.date).format('DD-MM-YYYY')}
        </Text>
      );
    return null;
  };

  const removeValue = async (itemId, index) => {
    const income = JSON.parse(await AsyncStorage.getItem('income'));
    const expense = JSON.parse(await AsyncStorage.getItem('expense'));

    setAddData(
      addData.filter(item => {
        return item.id !== itemId.id;
      }),
    );
    if (inSelect === 'income') {
      var updatedArray = [];
      updatedArray = income.filter(inc => {
        return inc.id !== itemId.id;
      });
      await AsyncStorage.setItem('income', JSON.stringify(updatedArray));
    } else if (inSelect === 'expense') {
      var updatedArray = [];
      updatedArray = expense.filter(inc => {
        return inc.id !== itemId.id;
      });
      await AsyncStorage.setItem('expense', JSON.stringify(updatedArray));
    }
    getData();
  };

  const rightSwiper = (item, index) => {
    console.log('idscd', item.id);
    return (
      <TouchableOpacity
        onPress={() => removeValue(item, index)}
        style={styles.rightSwiper}>
        <MaterialIcons
          style={styles.plusIcon}
          name={'delete-outline'}
          size={20}
          color={'#fff'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TopnavBar />
        <HistoryCom
          month={month}
          setMonth={month => setMonth(month)}
          expenseTotal={expenseTotal}
          incomeTotal={incomeTotal}
          incomePress={() => setInSelect('income')}
          expensePress={() => setInSelect('expense')}
        />
        {addData == '' ? null : (
          <PieChartCom expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
        )}
        {addData == '' ? (
          <View style={styles.noRecors}>
            <Text>No analysis for this month</Text>
          </View>
        ) : (
          <FlatList
            data={addData}
            contentContainerStyle={{
              borderTopColor: colors.backColor,
              borderTopWidth: 1,
              paddingVertical: 10,
            }}
            renderItem={({item, index}) => {
              return (
                <View>
                  {dateHandler(item, index)}
                  <Swipeable
                    data={addData}
                    renderRightActions={() => rightSwiper(item, index)}>
                    <View style={styles.dataRecord}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.incomeicon]}>
                          {incomeIconeHandler(item.category.icone)}
                        </View>
                        <Text
                          style={{marginRight: 20, width: 120, color: '#000'}}>
                          {item.category ? item.category.title : ''}
                        </Text>
                      </View>
                      <View style={{alignItems: 'flex-start'}}>
                        {inSelect === 'income' ? (
                          <View style={styles.expenseContaint}>
                            <View style={styles.addStyle}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 11,
                                  fontWeight: 500,
                                }}>
                                INC
                              </Text>
                            </View>
                            <Text style={{color: '#000'}}>
                              {item.amount}.00
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.expenseContaint}>
                            <View style={styles.expenseStyle}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 11,
                                  fontWeight: 500,
                                }}>
                                EXP
                              </Text>
                            </View>
                            <Text style={{color: '#000'}}>
                              {item.amount}.00
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </Swipeable>
                </View>
              );
            }}
          />
        )}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Calculator')}>
        <AntDesign
          style={styles.plusIcon}
          name={'pluscircle'}
          size={40}
          color={'#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

const moneyCom = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 5,
  marginRight: 5,
  paddingHorizontal: 10,
};
export default Analysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noRecors: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  plusIcon: {
    position: 'absolute',
    bottom: 15,
    right: 10,
  },
  rightSwiper: {
    width: 50,
    height: '100%',
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  dataRecord: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 20,
    // justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 2,
  },
  incomeicon: {
    width: 30,
    height: 30,
    backgroundColor: colors.backColor,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  addStyle: {
    backgroundColor: '#08C805',
    ...moneyCom,
  },
  expenseContaint: {
    width: windowWidth / 2 - 50,
    flexDirection: 'row',
  },
  expenseStyle: {
    backgroundColor: '#EC3D00',
    ...moneyCom,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
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
import {FlatList} from 'react-native-gesture-handler';
import {colors} from '../../constants/colors';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {
  incomeTotalHandler,
  expenseTotalHandler,
} from '../../constants/functionCom';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Budgets = ({navigation}) => {
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
    const income = JSON.parse(await AsyncStorage.getItem('income')) || [];
    const expense = JSON.parse(await AsyncStorage.getItem('expense')) || [];
    const limit = JSON.parse(await AsyncStorage.getItem('limit')) || [];
    var incomeArr = [],
      expenseArr = [];
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
    } else setAddData([]);
    setIncomeTotal(total);
    var totals = 0;
    if (expense && expense.length > 0) {
      expenseArr = expense
        .filter(incfilter => {
          return moment(incfilter.date).isSame(month, 'month');
        })
        .map(inc => {
          totals += parseFloat(inc.amount);
          var eLimit = limit.find(lim => {
            var expenseMonth = moment(inc.date).format('MM');
            var LimitMonth = moment(lim.date).format('MM');
            return (
              inc?.categoryId === lim?.categoryId && expenseMonth === LimitMonth
            );
          });
          if (eLimit && eLimit.limit) inc.limit = eLimit.limit;
          const category = expenseCategories.find(
            item => item?.id === inc?.categoryId,
          );
          if (category) inc.category = category;
          return inc;
        });
    } else setAddData([]);
    setExpenseTotal(totals);
    setAddData(inSelect === 'income' ? incomeArr : expenseArr);
  };
  const dateHandler = (item, index) => {
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
    <View style={styles.containt}>
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

        {addData == '' ? (
          <View style={styles.noRecors}>
            <Text>No budget is applied for this month.</Text>
            <Text>set your budget-limits for this</Text>
            <Text>month.</Text>
          </View>
        ) : (
          <FlatList
            data={addData}
            renderItem={({item, index}) => {
              return (
                <View>
                  {dateHandler(item, index)}
                  <Swipeable
                    data={addData}
                    renderRightActions={() => rightSwiper(item, index)}>
                    <View style={styles.budgetContaint}>
                      {incomeIconeHandler(item.category.icone)}
                      <View style={{flex: 1, marginRight: 10, marginLeft: 10}}>
                        <Text style={styles.budgetText}>
                          {item.category ? item.category.title : ''}
                        </Text>
                        {inSelect == 'expense' ? (
                          <Text style={styles.budgetText}>
                            Limits: ADD {item.limit}
                          </Text>
                        ) : null}
                        <Text>Spand : ADD {item.amount}.00</Text>

                        {item.limit && (
                          <Text style={styles.budgetText}>
                            Remaining : {item.limit - item.amount}{' '}
                          </Text>
                        )}
                        {inSelect == 'income' ? (
                          <View style={styles.budgetborder}></View>
                        ) : (
                          <View style={styles.budgetborderRed}></View>
                        )}
                        <Text style={styles.budgetText}>
                          Congrats! You are still whithin budget.
                        </Text>
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

export default Budgets;

const styles = StyleSheet.create({
  containt: {
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
    justifyContent: 'center',
  },
  budgetContaint: {
    flexDirection: 'row',
    // marginHorizontal: 10,
    marginTop: 15,
    borderBottomColor: colors.backColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginHorizontal: 10,
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  budgetText: {
    color: '#000',
    fontSize: 14,
    marginRight: 5,
  },
  budgetborder: {
    borderBottomColor: 'green',
    borderBottomWidth: 8,
    borderRadius: 5,
    marginVertical: 10,
    width: '85%',
  },
  budgetborderRed: {
    borderBottomColor: 'red',
    borderBottomWidth: 8,
    borderRadius: 5,
    marginVertical: 10,
    width: '85%',
  },
});

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../constants/colors';
import {expenseCategories, incomeCategories} from '../constants/dataCom';
import AntDesign from 'react-native-vector-icons/AntDesign';

const IncomeCategories = ({navigation, route}) => {
  const isSelecte = route.params;
  const incomecategory = incomeCategories?.category || '';
  const [select, setSelect] = useState(isSelecte);

  const selectHandler = index => {
    incomeCategories[index];
    navigation.navigate('Calculator', incomeCategories[index]);
  };

  const expenseSelectHandler = index => {
    expenseCategories[index];
    navigation.navigate('Calculator', expenseCategories[index]);
  };

  const incomeIconeHandler = (iconName, item) => {
    if (iconName === 'gift') {
      return (
        <FontAwesome
          style={styles.plusIcon}
          name={item.icone}
          size={19}
          color={'#000'}
        />
      );
    } else if (iconName === 'attach-money') {
      return (
        <MaterialIcons
          style={styles.plusIcon}
          name={item.icone}
          size={22}
          color={'#000'}
        />
      );
    } else if (iconName === 'wallet') {
      return (
        <FontAwesome5
          style={styles.plusIcon}
          name={item.icone}
          size={17}
          color={'#000'}
        />
      );
    }
  };
  const expenseIconeHandler = (iconName, item) => {
    var size = 24;
    if (iconName === 'heart') {
      return (
        <FontAwesome
          style={styles.plusIcon}
          name={item.icone}
          size={18}
          color={'#000'}
        />
      );
    } else if (iconName === 'note') {
      return (
        <Octicons
          style={styles.plusIcon}
          name={'note'}
          size={20}
          color={'#000'}
        />
      );
    } else if (iconName === 'graduation-cap') {
      return (
        <FontAwesome
          style={styles.plusIcon}
          name={item.icone}
          size={18}
          color={'#000'}
        />
      );
    } else if (iconName === 'game-controller') {
      return (
        <Ionicons
          style={styles.plusIcon}
          name={item.icone}
          size={20}
          color={'#000'}
        />
      );
    } else if (iconName === 'fastfood') {
      return (
        <MaterialIcons
          style={styles.plusIcon}
          name={item.icone}
          size={20}
          color={'#000'}
        />
      );
    } else if (iconName === 'gift') {
      return (
        <FontAwesome
          style={styles.plusIcon}
          name={item.icone}
          size={size}
          color={'#000'}
        />
      );
    } else if (iconName === 'stethoscope') {
      return (
        <MaterialCommunityIcons
          style={styles.plusIcon}
          name={item.icone}
          size={20}
          color={'#000'}
        />
      );
    } else if (iconName === 'shield-check') {
      return (
        <MaterialCommunityIcons
          style={styles.plusIcon}
          name={item.icone}
          size={size}
          color={'#000'}
        />
      );
    } else if (iconName === 'shield-home') {
      return (
        <MaterialCommunityIcons
          style={styles.plusIcon}
          name={item.icone}
          size={size}
          color={'#000'}
        />
      );
    } else if (iconName === 'shopping-cart') {
      return (
        <MaterialIcons
          style={styles.plusIcon}
          name={item.icone}
          size={20}
          color={'#000'}
        />
      );
    } else if (iconName === 'sports-cricket') {
      return (
        <MaterialIcons
          style={styles.plusIcon}
          name={item.icone}
          size={20}
          color={'#000'}
        />
      );
    } else if (iconName === 'bag-suitcase') {
      return (
        <MaterialCommunityIcons
          style={styles.plusIcon}
          name={item.icone}
          size={size}
          color={'#000'}
        />
      );
    } else if (iconName === 'bus') {
      return (
        <FontAwesome5
          style={styles.plusIcon}
          name={item.icone}
          size={20}
          color={'#000'}
        />
      );
    }
  };

  const incomeHandler = () => {
    return (
      <View>
        <View style={styles.incomeContaint}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              style={{marginLeft: 10}}
              name={'arrowleft'}
              size={25}
              color={'#000'}
            />
          </TouchableOpacity>
          <Text style={{color: '#000', fontSize: 20, marginHorizontal: 15}}>
            Income Categories
          </Text>
        </View>

        <FlatList
          data={incomeCategories}
          renderItem={({item, index}) => {
            return (
              <View style={styles.incomeList} key={index}>
                <View style={styles.incomeicon}>
                  {incomeIconeHandler(item.icone, item)}
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    marginHorizontal: 15,
                  }}>
                  <Text style={{fontSize: 18, color: '#000'}}>
                    {item.title}
                  </Text>
                  <TouchableOpacity onPress={() => selectHandler(index)}>
                    <SimpleLineIcons
                      style={styles.plusIcon}
                      name={item.plusIcon}
                      size={25}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const expenseHandler = () => {
    return (
      <View>
        <View style={styles.incomeContaint}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              style={{marginLeft: 10}}
              name={'arrowleft'}
              size={25}
              color={'#000'}
            />
          </TouchableOpacity>
          <Text style={{color: '#000', fontSize: 20, marginHorizontal: 20}}>
            Expense Categories
          </Text>
        </View>
        <FlatList
          data={expenseCategories}
          renderItem={({item, index}) => {
            return (
              <View style={styles.incomeList}>
                <View style={styles.incomeicon}>
                  {expenseIconeHandler(item.icone, item)}
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    marginHorizontal: 15,
                  }}>
                  <Text style={{fontSize: 18, color: '#000'}}>
                    {item.title}
                  </Text>
                  <TouchableOpacity onPress={() => expenseSelectHandler(index)}>
                    <SimpleLineIcons
                      style={styles.plusIcon}
                      name={'plus'}
                      size={25}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.containt}>
      <ScrollView>
        {isSelecte === 'income'
          ? incomeHandler()
          : isSelecte === '' && incomeHandler()}
        {isSelecte === 'expense'
          ? expenseHandler()
          : isSelecte === '' && expenseHandler()}
      </ScrollView>
    </View>
  );
};

export default IncomeCategories;

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
    flexDirection: 'row',
  },
  incomeList: {
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  incomeicon: {
    width: 30,
    height: 30,
    backgroundColor: colors.backColor,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../screen/Home/Home';
import Categories from '../screen/Categories/Categories';
import Budgets from '../screen/Budgets/Budgets';
import Information from '../screen/Information/Information';
import Calculator from '../Calculator/Calculator';
import Income from '../screen/Income/Income';
import IncomeCategories from '../IncomeCategories/IncomeCategories';
import Login from '../Login/Login';
import SignIn from '../SignIn/SignIn';
import CustomDrawer from '../components/CustomDrawer';
import Analysis from '../screen/Analysis/Analysis';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../constants/colors';
import {isAndroid} from '../utils/deviceInfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useWindowDimensions} from 'react-native';
import cal from '../cal';

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};
export default Navigation;

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="cal" component={cal} /> */}
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="IncomeCategories" component={IncomeCategories} />
      {/* <Stack.Screen name="Income" component={Income} /> */}
    </Stack.Navigator>
  );
};

const AnalysisStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Analysis" component={Analysis} />
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="IncomeCategories" component={IncomeCategories} />
    </Stack.Navigator>
  );
};

const BudgetsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Budgets" component={Budgets} />
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="IncomeCategories" component={IncomeCategories} />
    </Stack.Navigator>
  );
};

const BottomTabBar = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        // safeAreaInsets: { bottom:  },
        headerShown: false,
        tabBarIcon: ({color}) => {
          let iconName,
            size = 25;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Analysis') {
            iconName = 'pie-chart';
          } else if (route.name === 'Budgets') {
            return <Fontisto name={'dollar'} size={25} color={color} />;
          } else if (route.name === 'Categories') {
            iconName = 'bell';
          } else if (route.name === 'Information') {
            iconName = 'info';
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({focused, color}) => {
          let title;
          if (route.name === 'Home') {
            title = 'Home';
          } else if (route.name === 'Analysis') {
            title = 'Analysis';
          } else if (route.name === 'Budgets') {
            title = 'Budgets';
          } else if (route.name === 'Categories') {
            title = 'Categories';
          } else if (route.name === 'Information') {
            title = 'Information';
          }
          return title ? (
            <Text style={[styles.tabLabelStyle, {color}]}>{title}</Text>
          ) : null;
        },
        tabBarActiveTintColor: '#000',
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: '#fff',
      })}>
      <BottomTab.Screen name="Home" component={HomeStack} />
      <BottomTab.Screen name="Analysis" component={AnalysisStack} />
      <BottomTab.Screen name="Budgets" component={BudgetsStack} />
      <BottomTab.Screen name="Categories" component={Categories} />
      <BottomTab.Screen name="Information" component={Information} />
    </BottomTab.Navigator>
  );
};

const DrawerNavigation = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerIcon: () => null,

        headerShown: false,
        drawerStyle: {
          width: '100%',
          backgroundColor: colors.statusBar,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="BottomTabBar" component={BottomTabBar} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 66,
    paddingTop: isAndroid ? 5 : 5,
    paddingBottom: isAndroid ? 8 : 10,
    backgroundColor: colors.statusBar,
  },
  tabLabelStyle: {
    fontSize: 11,
    color: '#fff',
  },
});

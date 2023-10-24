import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const incomeCategories = [
  {
    category: 'income',
    id: '14',
    icone: 'gift',
    title: 'Awards',
    plusIcon: 'plus',
  },
  {
    category: 'income',
    id: '15',
    icone: 'attach-money',
    title: 'Refunds',
    plusIcon: 'plus',
  },
  {
    category: 'income',
    id: '16',
    icone: 'wallet',
    title: 'Salary',
    plusIcon: 'plus',
  },
];

export const expenseCategories = [
  {category: 'expense', id: '1', icone: 'heart', title: 'Beauty'},
  {category: 'expense', id: '2', icone: 'note', title: 'Bills'},
  {category: 'expense', id: '3', icone: 'graduation-cap', title: 'Education'},
  {
    category: 'expense',
    id: '4',
    icone: 'game-controller',
    title: 'Entertainment',
  },
  {category: 'expense', id: '5', icone: 'fastfood', title: 'Food'},
  {category: 'expense', id: '6', icone: 'gift', title: 'Gift'},
  {category: 'expense', id: '7', icone: 'stethoscope', title: 'Health'},
  {category: 'expense', id: '8', icone: 'shield-check', title: 'Insurance'},
  {category: 'expense', id: '9', icone: 'shield-home', title: 'Rental'},
  {category: 'expense', id: '10', icone: 'shopping-cart', title: 'Shopping'},
  {category: 'expense', id: '11', icone: 'sports-cricket', title: 'Sports'},
  {category: 'expense', id: '12', icone: 'bus', title: 'Transportation'},
  {category: 'expense', id: '13', icone: 'bag-suitcase', title: 'Travelling'},
];

export const incomeIconeHandler = icon => {
  var size = 22;
  if (icon === 'gift')
    return <FontAwesome name={icon} size={17} color={'#000'} />;
  else if (icon === 'attach-money')
    return <MaterialIcons name={icon} size={22} color={'#000'} />;
  else if (icon === 'wallet')
    return <FontAwesome5 name={icon} size={17} color={'#000'} />;
  else if (icon === 'heart')
    return <FontAwesome name={icon} size={20} color={'#000'} />;
  else if (icon === 'note')
    return <Octicons name={icon} size={20} color={'#000'} />;
  else if (icon === 'graduation-cap')
    return <FontAwesome name={icon} size={17} color={'#000'} />;
  else if (icon === 'game-controller')
    return <Ionicons name={icon} size={20} color={'#000'} />;
  else if (icon === 'fastfood')
    return <MaterialIcons name={icon} size={20} color={'#000'} />;
  else if (icon === 'gift')
    return <FontAwesome name={icon} size={size} color={'#000'} />;
  else if (icon === 'stethoscope')
    return <MaterialCommunityIcons name={icon} size={20} color={'#000'} />;
  else if (icon === 'shield-check')
    return <MaterialCommunityIcons name={icon} size={size} color={'#000'} />;
  else if (icon === 'shield-home')
    return <MaterialCommunityIcons name={icon} size={size} color={'#000'} />;
  else if (icon === 'shopping-cart')
    return <MaterialIcons name={icon} size={20} color={'#000'} />;
  else if (icon === 'sports-cricket')
    return <MaterialIcons name={icon} size={20} color={'#000'} />;
  else if (icon === 'bus')
    return <FontAwesome5 name={icon} size={18} color={'#000'} />;
  else if (icon === 'bag-suitcase')
    return <MaterialCommunityIcons name={icon} size={size} color={'#000'} />;
  else if (icon === 'arrow-redo-sharp')
    return <Ionicons name={icon} size={size} color={'#000'} />;
};

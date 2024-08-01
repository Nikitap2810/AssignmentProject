import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
              
import FlashMessage from 'react-native-flash-message';
import SplashScreen from './src/screens/SplashScreen';
import FirstScreen from './src/screens/FirstScreen';
import SecondScreen from './src/screens/SecondScreen';
import { store } from './src/redux/store';
import {Provider as StoreProvider, useSelector} from 'react-redux';
import ThirdScreen from './src/screens/ThirdScreen';
import StackNavigation from './src/navigtion/StackNavigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={{backgroundColor:"#FFF", flex:1}}>
       <StoreProvider store={store}>
     
        <StackNavigation/>
            <FlashMessage position="top" />
         
            </StoreProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
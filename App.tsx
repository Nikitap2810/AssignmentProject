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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={{backgroundColor:"#FFF", flex:1}}>
       <StoreProvider store={store}>
     
          <NavigationContainer>
          <Stack.Navigator
              screenOptions={{headerShown: false}}
              >
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="FirstPage" component={FirstScreen} />
              <Stack.Screen name="SecondPage" component={SecondScreen} />
              <Stack.Screen name="ThirdPage" component={ThirdScreen} />
              </Stack.Navigator>
            </NavigationContainer>
            <FlashMessage position="top" />
         
            </StoreProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import FirstScreen from '../screens/FirstScreen';
import SecondScreen from '../screens/SecondScreen';
import ThirdScreen from '../screens/ThirdScreen';
import BottomTabNavigation from './BottomTabNavigation';
import DetailMovieScreen from '../screens/newAssignment/DetailMovieScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Splash"
          options={{headerShown: false}}
          component={SplashScreen}
        />
        <Stack.Screen
          name="BottomTab"
          options={{headerShown: false}}
          component={BottomTabNavigation}
        />
        <Stack.Screen name="FirstPage" component={FirstScreen} />
        <Stack.Screen
          name="SecondPage"
          options={{
            title: 'Address Form',
          }}
          component={SecondScreen}
        />
        <Stack.Screen
          name="ThirdPage"
          options={{
            title: 'Address List',
          }}
          component={ThirdScreen}
        />
        <Stack.Screen name="MovieDetail" component={DetailMovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/newAssignment/HomeScreen';
import SearchScreen from '../screens/newAssignment/SearchScreen';
import FavouriteScreen from '../screens/newAssignment/FavouriteScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ThirdScreen from '../screens/ThirdScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#FF7E5F' : '#808080'}}>Home</Text>
          ),

          tabBarIcon: ({color, focused}) => (
            <FontAwesome5
              name="home"
              color={focused ? '#FF7E5F' : '#808080'}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#FF7E5F' : '#808080'}}>Search</Text>
          ),

          tabBarIcon: ({color, focused}) => (
            <FontAwesome5
              name="search"
              color={focused ? '#FF7E5F' : '#808080'}
              size={22}
            />
          ),
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#FF7E5F' : '#808080'}}>
              Favorite
            </Text>
          ),

          tabBarIcon: ({color, focused}) => (
            <FontAwesome5
              name="heart"
              color={focused ? '#FF7E5F' : '#808080'}
              size={22}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Address"
        component={ThirdScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? '#FF7E5F' : '#808080'}}>
              Address
            </Text>
          ),

          tabBarIcon: ({color, focused}) => (
            <FontAwesome5
              name="list"
              color={focused ? '#FF7E5F' : '#808080'}
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});

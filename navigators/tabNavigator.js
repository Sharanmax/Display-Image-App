import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ListScreen, ViewDetailsScreen, HistoryScreen} from '../screens'

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator
      backBehavior={"history"}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#aaa',
        activeBackgroundColor:  'rgba(87, 65, 157, 0)',
        labelPosition: 'beside-icon',
        keyboardHidesTabBar: true,
        labelStyle: {
            fontSize: 14,
            fontWeight: "bold"
        },
      }}
    >
      <Tab.Screen name="Home" component={ListScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
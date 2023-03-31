import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomersScreen from '../screens/CustomersScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

export type TabStackParamList = {
    Customers : undefined;
    Orders : undefined
}
const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown : false,
    });
  }, [])
    return (
    <Tab.Navigator screenOptions={({ route })=>({ 
        tabBarActiveTintColor : "#0E8388",
        tabBarInactiveTintColor: "gray",
        tabBarIcon : ({ color, size, focused}) => {
            if(route.name === "Customers") {
                return (
                    <Icon
                     name='users'
                     type='entypo'
                     color={ focused ? "#0E8388" : "gray"}
                     />
                )
            } else if (route.name === "Orders") {
                return (
                    <Icon
                     name='box'
                     type='entypo'
                     color={ focused ? "#2C3333" : "gray"}
                    />
                )
            }
        }
    })}>
        <Tab.Screen name='Customers' component={CustomersScreen} />
        <Tab.Screen name='Orders' component={OrdersScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
import { View, Text } from 'react-native'
import React, { useLayoutEffect} from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import DeliveryCard from '../components/DeliveryCard';

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "Orders">,
NativeStackNavigationProp<RootStackParamList>
>;

const OrderScreen = () => {
const navigation = useNavigation<OrdersScreenNavigationProp>();
const {params: {order}} = useRoute<OrderScreenRouteProp>();

useLayoutEffect(()=>{
    navigation.setOptions({
        headerTitleAlign: "center",
        headerTitle: order.trackingItems.customer.name,
        headerTintColor: "#2C3333",
        headerTitleStyle: { color : "black"}
    })
},[order])

  return (
    <View className='-mt-2'>
      <DeliveryCard key={order.trackingId} order={order} fullWidth />
    </View>
  )
}

export default OrderScreen
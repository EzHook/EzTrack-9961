import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../navigator/RootNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useOrders from '../hooks/useOrders';
import { Button, Image } from '@rneui/themed';
import { ActivityIndicator } from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicator';
import OrderCard from '../components/OrderCard';

type OrdersScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "Orders">,
NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {

  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {loading, error, orders} = useOrders();
  const [ascending, setAscending] = useState<boolean>(false)

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({focused, color}) => (
        <Text style={{
          color : focused ? "#2C3333" : color, fontSize: 10
        }}>
          Orders
        </Text>
      ),
    })
  },[])

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style={{
      backgroundColor: "#2C3333"
    }}>
      <Image
      source={{
        uri:"https://www.advotics.com/wp-content/uploads/2022/02/surat-jalan-01-1-4.png"
      }}
      containerStyle={{
        width : "100%",
        height : 280,
     }}
      />
      <View>
        <Button
         containerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10
         }}
         color="#2E4F4F"
         titleStyle={{ color: "#CBE4DE", fontWeight: "400"}}
         onPress={()=> setAscending(!ascending)}>
          {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
        </Button>
        {orders?.sort((a, b) => {
          if(ascending) {
            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1 ;
          } else {
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1 ;
          }
        }).map((order)=> (
          <OrderCard key={order.trackingId} item={order} />
        ))}
      </View>
      <View style={{ height: 100}} />
    </ScrollView>
   
  )
}

export default OrdersScreen
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';

export type OrdersScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "Orders">,
NativeStackNavigationProp<RootStackParamList>
>;

type Prop = {
    item : Order
}

const OrderCard = ({ item }: Prop) => {

    const navigation = useNavigation<OrdersScreenNavigationProp>();

  return (
    <TouchableOpacity onPress={()=> navigation.navigate("Order", { order : item})}>
        <Card containerStyle={{
            paddingHorizontal: 15,
            borderRadius: 10
        }}>
            <View className='flex-row justify-between items-center'>
                <View>
                    <Icon type='material-community' name='truck-fast' color="#2C3333" />
                    <Text style={{
                        fontSize: 10,
                    
                    }}>{new Date(item.createdAt).toDateString()}</Text>
                </View>

                <View>
                    <Text className='text-gray-400' style={{ fontSize: 9}}>{item.carrier} - {item.trackingId}</Text>
                    <Text className='text-gray-500 text-xl'>{item.trackingItems.customer.name}</Text>
                </View>

                <View className='flex-row items-center'>
                    <Text className='pr-2 text-sm text-[#2C3333]'>{item.trackingItems.items.length}x</Text>
                    <Icon type='font-awesome-5' name='boxes' color="#2C3333" />
                </View>
            </View>
        </Card>
        
    </TouchableOpacity>
  )
}

export default OrderCard
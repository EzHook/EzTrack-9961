import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

type ModalScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList>,
NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">

const ModalScreen = () => {
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const {params:{ name, userId }} = useRoute<ModalScreenRouteProp>();
    
    const {loading, error, orders} = useCustomerOrders(userId);
    
  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack} className='absolute right-5 top-10 z-10'>
        <Icon type='antdesign' name='closecircle' size={30} />
      </TouchableOpacity>
      <View className='mt-10 '>
        <View className='py-5 border-b border-[#0E8388]'>
          <Text className="text-center text-xl font-bold text-[#0E8388]">{name}</Text>
          <Text className='text-center italic text-sm'>Deliveries</Text>
        </View>
      </View>

      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom:200
      }}
       data={orders}
       keyExtractor={(item)=> item.trackingId}
       renderItem={({item : order})=> <DeliveryCard key={order.trackingId} order={order} />}
      />
    </View>
  )
}

export default ModalScreen
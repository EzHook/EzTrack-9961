import { View, Text } from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomersScreen';
import { TouchableOpacity } from 'react-native';
import { Card, Icon } from '@rneui/themed';

type Props = {
    userId: string;
    name: string;
    email: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
    const { loading, error, orders} = useCustomerOrders(userId);
    const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
   <TouchableOpacity onPress={()=> navigation.navigate("MyModal",{
    name: name,
    userId: userId,
   })}>
      <Card containerStyle={{
        padding: 20,
        borderRadius: 10
      }}>
        <View>
            <View className='flex-row justify-between'>
              <View>
                <Text className='font-bold text-2xl'>{name}</Text>
                <Text className='text-sm text-[#0E8388]'>ID: {userId}</Text>
              </View>
           
              <View className='flex-row justify-end items-center'>
                <Text className='text-[#0E8388] mr-2'>{loading ? "loading..." : `${orders.length}x` }</Text>
                <Icon
                  style={{
                  marginBottom: 10,
                  marginLeft: "auto"
                }}
                name='box'
                type='entypo'
                color="#0E8388"
                size={50}
                />
              </View>
            </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
   </TouchableOpacity>
  )
}

export default CustomerCard
import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { RootStackParamList } from '../navigator/RootNavigator'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ScrollView } from 'react-native'
import { Image, Input } from '@rneui/themed'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'react-native'
import { TextInput } from 'react-native'
import { useQuery } from '@apollo/client'
import { GET_CUSTOMERS } from '../graphql/queries'
import CustomerCard from '../components/CustomerCard'

export type CustomerScreenNavigationProp =
 CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "Customers">,
 NativeStackNavigationProp<RootStackParamList>
 >;


const CustomersScreen = () => {

    const [input, setInput] = useState<string>('');
    const navigation = useNavigation<CustomerScreenNavigationProp> ();
    const { loading, error, data } = useQuery(GET_CUSTOMERS);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown : false,
        })
    },[])
    console.log(data);

  return (
   <ScrollView 
    showsVerticalScrollIndicator={false}
   style={{
    backgroundColor : "#0E8388"
   }}>
    <Image 
     source={{
        uri : "https://static.vecteezy.com/system/resources/previews/007/011/099/original/illustration-on-the-theme-of-delivery-vector.jpg"
     }}
     containerStyle={{
        width : "100%",
        height : 300
     }}
     PlaceholderContent={<ActivityIndicator />}
     />
     <TextInput className='bg-white pt-5 px-10 pb-5 underline decoration-black'  placeholder='Search by Customers' value={input} onChangeText={setInput} />
     {/* <Input placeholder='Search By Customers' value={input} onChangeText={setInput} containerStyle={{
      backgroundColor: "white",
      paddingTop: 10,
      paddingBottom: 5,
      paddingHorizontal: 20,
      borderStyle: "dashed",
      borderColor: "blue"
     }} /> */}
     { data?.getCustomers
     ?.filter((customer : CustomerList)=> customer.value.name.includes(input))
     .map(({name: ID, value:{ email, name}}: CustomerResponse)=> (
      <CustomerCard key={ID} email={email} name={name} userId={ID} />
     ))} 
     <View style={{ height: 100}} />
   </ScrollView>
  )
}


export default CustomersScreen
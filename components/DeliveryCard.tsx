import { View, Text } from 'react-native'
import React from 'react'
import { Card, Divider, Icon } from '@rneui/themed';
import MapView, { Marker } from 'react-native-maps';

type Props = {
    order : Order;
    fullWidth? : boolean;
}

const DeliveryCard = ({order, fullWidth} : Props) => {
  return (
    <Card containerStyle={{
        backgroundColor:fullWidth ? "#2C3333" :"#0E8388",
        borderRadius: fullWidth ? 0 : 10,
        marginTop:fullWidth ? 0 : 10,
        margin: fullWidth ? 0 : 5,
        padding: 0,
        paddingTop: 16,
        shadowColor: "black",
        shadowOffset: { width:0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 4,
    }}>
      <View style={fullWidth && { height : "100%"}}>
        <Icon name='box'type='entypo'color="white" size={50}/>
        <View >
            <Text className='text-xs text-center font-bold uppercase text-white'>{order.carrier} - {order.trackingId}</Text>
            <Text className='text-lg text-center text-white text font-bold'>Expected Delivery : {new Date(order.createdAt).toLocaleDateString()}</Text>
        <Divider color='white' />
        </View>
        <View className='mx-auto pb-5'>
            <Text className='text-center font-bold text-white mt-5 text-base'>Address</Text>
            <Text className='text-sm text-white text-center'>{order.Address}, {order.City}</Text>
            <Text className='text-sm text-white italic text-center '>Shipping Cost: ₹{order.shippingCost}/-</Text>
        </View>
      
      
      <Divider color='white' />

      <View className='p-5'>
        {order.trackingItems.items.map((item : Item)=>(
            <View key={item.item_id} className='flex-row justify-between items-center'>
                <Text className='text-sm text-white italic'>{item.name}</Text>
                <Text className='text-xl text-white'>x {item.quantity}</Text>
            </View>
        ))}
      </View>
      <Divider color='white' />
      <MapView
       initialRegion={{
        latitude: order.Lat,
        longitude: order.Lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
       }}
       className="w-full"
       style={{ flexGrow: 1, ...( !fullWidth && { height: 200 } ) }}
      >
        {order.Lat && order.Lng && (
            <Marker
             coordinate={{
                latitude: order.Lat,
                longitude: order.Lng,
             }}
             title="Delivery Location"
             description={order.Address}
             identifier="destination"
            />
        )}
      </MapView>
      </View>
    </Card>
  )
}

export default DeliveryCard
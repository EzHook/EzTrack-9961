import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '../graphql/queries'

const useCustomerOrders = (userId: string ) => {

    const { loading, error, data} = useQuery(GET_ORDERS);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(()=>{
        if(!data) return;

        const order : Order[] = data.getOrders.map(({ value }:OrderResponse) => ({
            carrier: value.carrier,
            createdAt : value.createdAt,
            shippingCost: value.shippingCost,
            trackingId: value.trackingId,
            trackingItems: value.trackingItems,
            Address: value.Address,
            City: value.City,
            Lat: value.Lat,
            Lng: value.Lng,
        }));

        const thatCustomer = order.filter((theOrder)=> theOrder.trackingItems.customer_id === userId);
        setOrders(thatCustomer);
    },[data, userId])

  return {loading, error, orders};
}

export default useCustomerOrders
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '../graphql/queries'

const useOrders = () => {

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

        setOrders(order);
        
    },[data])

  return {loading, error, orders}
};

export default useOrders;
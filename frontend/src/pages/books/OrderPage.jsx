import React from 'react'
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext'

export default function OrderPage() {
    const {currentUser} = useAuth()
    const {data: orders=[], isLoading, isError} = useGetOrdersByEmailQuery(currentUser.email)

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error Fetching Orders</div>
  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl mb-4 font-semibold'>Your Orders</h2>
      {
        orders.length === 0 ? (<div>No orders found</div>) : (<div>
            {
                orders.map((order, index) => (
                    <div key={order._id} className="border-b border-black mb-4 pb-4">
                        <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                        <div className='flex flex-col sm:flex-row justify-between'>
                            <div>
                                <h2 className="font-bold">Order ID: {order._id}</h2>
                                <p className="text-gray-600">Name: {order.name}</p>
                                <p className="text-gray-600">Email: {order.email}</p>
                                <p className="text-gray-600">Phone: {order.phone}</p>
                                <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                            </div>
                            <div className=' sm:pr-10'>
                                <h2 className="font-bold">Address:</h2>
                                <p className='line-clamp-4'>{order.address.address},</p>
                                <p>{order.address.city}</p>
                                <p>{order.address.state}</p>
                                <p>{order.address.country}</p>
                                <p>{order.address.zipcode}</p>
                            </div>
                        </div>
                        <h3 className="font-semibold mt-2">Products Details:</h3>
                        <ul>
                            {order.orderDetail.map((item) => (
                                <li key={item.productId} className="mb-2 border">
                                    <p className="text-gray-600">Product Name: {item.title}</p>
                                    <p className="text-gray-600">Price: ${item.price}</p>
                                    <p className="text-gray-600">Quantity: {item.quantity} Pcs</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>)
      }
    </div>
  )
}

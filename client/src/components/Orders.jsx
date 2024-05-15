import React, { useEffect, useState } from 'react';
import OrderDetails from './OrderDetails';
import OrderService from '../services/OrderService';


const Orders = ({userId, location}) => {
    const [orderDetails, setOrderDetails] = useState(false);
    const [orders, setOrders] = useState([])
    const [selectedOrderId, setSelectedOrderId] = useState(0)
    const [totalPriceForOrder, setTotalPriceForOrder] = useState(0)
    const [currentLocation, setCurrentLocation] = useState("admin")

    const handleOrderDetails = (id, totalPrice) => {
        setSelectedOrderId(id);
        setTotalPriceForOrder(totalPrice);
        setOrderDetails(true);
      }

    const getOrders = async () => {
        try{
            if(userId > 0){
                await OrderService.getOrdersByUser(userId).then((res) => {
                    console.log("res", res)
                    setOrders(res)
                })
            } else {
                await OrderService.getOrders().then((res) => {
                    if (res.length > 0) {
                        setOrders(res);
                    }
                })
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if(location){
            setCurrentLocation(location);
        }
        getOrders();
    }, [])

  return (
    <div>
        <div className='orders-container flex justify-center w-full my-16'>
            {!orderDetails &&
            <div className='orders-content w-[80%] flex flex-col'>
                <div className='flex items-center p-2 w-full justify-between md:justify-normal border border-b-[#BDBDBD] border-l-0 border-r-0 border-t-0'>
                    <h2 className='text-xl md:text-2xl text-[#212121] font-semibold'>Recent Orders</h2>
                </div>
                <div className='hidden md:flex justify-between items-center p-2 pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                    <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Order #</h2>
                    <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Email</h2>
                    <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Full Name</h2>
                    <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Phone Number</h2>
                    <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Status</h2>
                    <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Action</h2>
                </div>

                {/* STATIC ORDER DATA */}
                {orders.length > 0 && orders.map((order, index) => {
                    const user = order.User

                    const fullName = `${user.firstName} ${user.lastName}`

                    let totalPrice = 0; // Initialize totalPrice to 0 for each order
                        order.Products.forEach(product => {
                            totalPrice += (product.price * product.Order_Products.quantity); // Sum up the price of each product
                        });
                    
                    return (
                        <div key={index} className='flex justify-between items-center p-2 md:pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                    <h2 className='text-[#333333] md:text-lg w-[10%] md:w-[16.6%]'>{order.id}</h2>
                    <h2 className='hidden md:block text-[#333333] md:text-lg w-[16.6%]'>{user.email}</h2>
                    <h2 className='text-[#333333] md:text-lg w-[16.6%]'>{fullName}</h2>
                    <h2 className='hidden md:block text-[#333333] md:text-lg w-[16.6%]'>{user.phoneNumber}</h2>
                    <h2 className='hidden md:block text-[#333333] md:text-lg w-[16.6%]'>{order.status}</h2>
                    <h2 onClick={() => handleOrderDetails(order.id, totalPrice)} className='text-[#828282] text-end md:text-start md:text-lg w-[16.6%] cursor-pointer'>View Order</h2>
                   </div>
                )
            })}
        
            </div>        
            }
         </div>
         {orderDetails && <OrderDetails location={currentLocation} id={selectedOrderId} totalPrice={totalPriceForOrder} closeOrderDetails={() => setOrderDetails(false)} />}
    </div>
  );
};

export default Orders;
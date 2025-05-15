import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Skeleton from '../shared/Skeleton';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { stripePaymentConfirmation } from '../../Store/actions';
import toast from 'react-hot-toast';

const PaymentConfirmation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const  [errorMessage, setErrorMessage ] = useState("");
    const { cart } = useSelector((state) => state.carts);
    const [ loading, setLoading] = useState(false);


    const paymentIntent = searchParams.get("payment_intent")
    const clientSecret= searchParams.get("payment_intent_client_secret")
    const redirectStatus = searchParams.get("redirect_status")

    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];

    const paymentMethod = localStorage.getItem("PAYMENT_METHOD")
        ? localStorage.getItem("PAYMENT_METHOD")
        : null

    const dispatch = useDispatch()

    useEffect(()=>{
        if (paymentIntent &&
            clientSecret && 
            redirectStatus && 
            cart && 
            cart?.length > 0
        ) {
            console.log("PAYMENTMETHOD:",paymentMethod)
            console.log("ADDRESS",selectedUserCheckoutAddress)
            const sendData = {
                addressId: selectedUserCheckoutAddress.addressId,
                pgName: paymentMethod,
                pgPaymentId:paymentIntent,
                pgStatus: redirectStatus,
                pgResponseMessage:"Payment successfull"
            }
         dispatch(stripePaymentConfirmation(sendData,setErrorMessage,setLoading,toast))
        }
    },[paymentIntent,clientSecret,redirectStatus,cart])
  return (
  
    <div className='min-h-screen flex items-center justify-center'>
        {loading ? (
            <div className='max-w-xl mx-auto'>
                <Skeleton/>
            </div>
        ): (
             <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
                <div className="text-green-500 mb-4 flex  justify-center">   
                    <FaCheckCircle size={64}/>
                </div>
                <h2 className='text-3xl font-bold text-gray-800 mb-2'> Payment Succesfull</h2>
                <p className="text-gray-600 mb-6"> Thank you for your purchase! Your payment was successfull.</p>
            </div>
        )}
    </div>

  )
}

export default PaymentConfirmation
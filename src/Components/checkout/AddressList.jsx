import React from 'react'
import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from 'react-icons/fa'
import { MdLocationCity, MdPublic } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import { selectUserCheckoutAdress } from '../../Store/actions'

const AddressList = ( {
        addresses,setSelectedAddress,setOpenAddressModal }) => {
  
    const dispatch = useDispatch()
    const {selectedUserAddress} = useSelector((state)=>state.auth)
    
    const onEditButtonHandler = (address) =>{
        setSelectedAddress(address)
        setOpenAddressModal(true)
    }
    
    const onDeleteButtonHandler = (address) =>{
        setSelectedAddress(address)
    }

    const handleAddressSelection = (address) =>{
        dispatch(selectUserCheckoutAdress(address))
    }
    return (
        <div className='space-y-4'>
            {addresses.map((item)=>(
                <div 
                    key={item.addressId}
                    onClick={()=>handleAddressSelection(item)}
                    className={`border rounded-md p-4 cursor-pointer relative ${
                        item.addressId === selectedUserAddress?.addressId ? 
                        "bg-green-200" 
                        : "bg-white"
                    }`}>


                        <div className='flex items-start'>
                            <div className='space-y-1'>
                                <div className='flex items-center'>
                                    <FaBuilding size={14} className='mr-3 text-gray-600'/>
                                    <p className='font-semibold'>{item.country}</p>
                                    { item.addressId === selectedUserAddress?.addressId &&
                                        <FaCheckCircle className='text-green-500 ml-2'/>}
                                </div>

                                <div className='flex items-center'>
                                    <FaStreetView size={17} className='mr-2 text-gray-600'/>
                                    <p className=''>{item.street}</p>
                                </div>

                                <div className='flex items-center'>
                                    <MdLocationCity size={17} className='mr-2 text-gray-600'/>
                                    <p className=''>{item.city}, {item.state}</p>
                                </div>

                                <div className='flex items-center'>
                                    <MdPublic size={17} className='mr-2 text-gray-600'/>
                                    <p className=''>{item.country}</p>
                                </div>
                            </div>
                        </div>
                    <div className='flex gap-3 absolute top-4 right-2'>
                        <button onClick={()=>onEditButtonHandler(item)}>
                            <FaEdit size={18} className='text-teal-700'/>
                        </button>
                        <button onClick={()=>onDeleteButtonHandler(item)}>
                            <FaTrash size={17} className='text-rose-600'/>
                        </button>
                    </div>
                </div>

            ))}
        </div>
  )
}

export default AddressList
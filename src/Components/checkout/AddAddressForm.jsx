import { FaAddressCard } from 'react-icons/fa'
import InputField from '../shared/inputField'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../shared/Spinner'
import { Link } from 'react-router-dom'
import { addUpdateUserAddress } from '../../Store/actions'
import toast from 'react-hot-toast'

const AddAddressForm = ({address,setOpenAddressModal}) => {

    const {btnLoader} = useSelector((state)=>state.errors)

     const {
            register,
            handleSubmit,
            reset,
            formState: {errors},
        } = useForm({
            mode: "onTouched"
        })
    
        const dispatch = useDispatch()
        const onSaveAddressHandler = async (data) =>{
            
            dispatch(addUpdateUserAddress(
                data,
                toast,
                address?.addressId,
                setOpenAddressModal,

            ))
        }
  return (
    <div className="">
                <form
                    onSubmit={handleSubmit(onSaveAddressHandler)}
                    className="">
                        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                            <FaAddressCard className="mr-2 text-2xl "/>
                            Add Address
                        </div>
                    
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="Street Name"
                            required
                            message="*Street name is required"
                            placeholder="Enter your street name"
                            id="street"
                            type="text"
                            register={register}
                            errors={errors}/>
    
                        <InputField
                            label="City"
                            required
                            id="city"
                            type="text"
                            message="*City is required"
                            placeholder="Enter your city"
                            register={register}
                            errors={errors}/>

                        <InputField
                            label="State"
                            required
                            id="state"
                            type="text"
                            message="*State is required"
                            placeholder="Enter your state"
                            register={register}
                            errors={errors}/>

                        <InputField
                            label="Country"
                            required
                            id="country"
                            type="text"
                            message="*Country is required"
                            placeholder="Enter your country"
                            register={register}
                            errors={errors}/>
                    </div>
    
                    <button
                        disabled={btnLoader}
                        className="bg-customBlue text-white px-4 py-2 rounded-md mt-4"
                        type="submit">
                            {btnLoader ? (
                                <>
                                    <Spinner/>Loading...
                                </>
                            ):(
                                
                                <>Save</>
                            )}
                    </button>
    
                   
                </form>
    </div>
  )
}

export default AddAddressForm
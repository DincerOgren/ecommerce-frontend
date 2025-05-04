import { useDispatch } from "react-redux"
import { increaseCartQuantity } from "../../Store/actions";


const btnStyles="border-[1.2px] border-slate-800 px-3 py-1 rounded "
const SetQuantity = ({
    quantity,
    cardCounter,
    handleQtyIncrease,
    handleQtyDecrease
})=>{


    

    return(

        <div className="flex gap-8 items-center">

            {cardCounter ? null : <div className="font-semiboldp"> QUANTITY</div>}
            <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm ">
                <button 
                    disabled={quantity<=1}
                    className={btnStyles}>
                    -
                </button>
            </div>

            <div className="text-red-500">{quantity}</div>

            <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
                <button 
                    
                    className={btnStyles}>
                    +
                </button>
            </div>
        </div>
    )

}

export default SetQuantity
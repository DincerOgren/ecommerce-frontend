import { selectUserCheckoutAdress } from "../actions"

const initialState= {
    user: null,
    address: [],
    selectedUserAddress: null,
    clientSecret: null

}


export const authReducer = (state = initialState,action) =>{

    switch (action.type) {
        case "LOGIN_USER":
            
            const newUser = action.payload

            return {
                ...state,
                user:newUser
            }
        case "LOGOUT_USER":
            return{
                user:null,
                address:null,
                selectedUserAddress:null
            }
        case "FETCH_USER_ADDRESSES":
            return{
                ...state,
                address:action.payload
            }
        case "REMOVE_CHECKOUT_ADDRESS":
            return{
                ...state,
                selectedUserAddress:null
            }
        case "SELECT_CHECKOUT_ADDRESS":
            return{
                ...state,
                selectedUserAddress:action.payload
            }
        case "CLIENT_SECRET":
            return{
                ...state,
                clientSecret: action.payload
            }
        case "REMOVE_CLIENT_SECRET_ADDRESS":
            return{
                ...state,
                clientSecret: null,
                selectedUserAddress: null,
            }
    
        default:
            return state;
    }
}
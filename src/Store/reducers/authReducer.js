const initialState= {
    user: null,
    address: [],
    selectedUserAddress: null

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
        case "SELECT_CHECKOUT_ADDRESS":
            return{
                ...state,
                selectedUserAddress:action.payload
            }
    
        default:
            return state;
    }
}
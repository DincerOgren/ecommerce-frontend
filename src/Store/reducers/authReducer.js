const initialState= {
    user: null,
    address: [],

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
                address:null
            }
    
        default:
            return state;
    }
}
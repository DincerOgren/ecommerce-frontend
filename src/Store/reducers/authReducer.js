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
            const emptyUser = null;
            return{
                ...state,
                user:emptyUser,
                address:null
            }
    
        default:
            return state;
    }
}
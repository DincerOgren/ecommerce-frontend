import api from "../../api/api"

export const fetchProducts = (queryString) => async (dispatch) => {
    try{
        dispatch({ type: "IS_FETCHING" })
        const {data} = await api.get(`/public/products?${queryString}`);
        dispatch({
            type:"FETCH_PRODUCTS",
            payload:data.products,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage,

        })
        dispatch({ type: "IS_SUCCESS" })

    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch product data!"
        })
        
    }
}


export const fetchCategories = () => async (dispatch) => {
    try{
        dispatch({ type: "CATEGORY_LOADING" })
        const {data} = await api.get(`/public/categories`);
        dispatch({
            type:"FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage,

        })
        dispatch({ type: "CATEGORY_SUCCESS" })

    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch category data!"
        })
        
    }
}


export const addToCart = (data,qty=1,toast) => 
    (dispatch, getState)=>{
        const {products} = getState().products
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity>=qty;

        if(isQuantityExist){

            dispatch({ 
                type: "ADD_CART",
                payload: {...data,quantity:qty},
            })
            toast.success(`${data.productName} added to the cart.`)
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
        }else{
            toast.error(`Out of stocks`)
            
        }
}


export const increaseCartQuantity = (data,toast,currentQuantity,setCurrentQuantity) =>
    (dispatch,getState) => {

        const {products} = getState().products
        console.log(getState())
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;
        if(isQuantityExist){
            const newQuantity = currentQuantity+1;
            setCurrentQuantity(newQuantity);
            
            console.log("new quantity" ,newQuantity, currentQuantity , "current")
            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity:newQuantity},
            })
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
        } else{
            toast.error("Quantity Reached the Limit.")
        }

}

export const decreaseCartQuantity = (data,newQuantity) => (dispatch,getState) => {
    
    dispatch({
        type:"ADD_CART",
        payload:{...data, quantity: newQuantity}
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
}


export const removeFromCart = (data,toast) => 
    (dispatch, getState)=>{

        
            dispatch({ 
                type: "REMOVE_CART",
                payload: data,
            })
            toast.success(`${data.productName} removed from the cart.`)
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
    
}


export const authenticateSignInUser = (sendData,toast,reset,navigate,setLoader)=> async (dispatch) =>{

    try {
        setLoader(true);
        const { data } = await api.post("/auth/signin",sendData)
        
        dispatch({

            type: "LOGIN_USER",
            payload: data   
        })

        localStorage.setItem("auth",JSON.stringify(data));
        reset();
        toast.success("Login successful")
        navigate("/");
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Internal server error")
    } finally {
        setLoader(false);
    }
}

export const registerNewUser = (sendData,toast,reset,navigate,setLoader)=> async (dispatch) =>{

    try {
        setLoader(true);
        const { data } = await api.post("/auth/signup",sendData)
        
        reset();
        toast.success(data?.message || "User registered successfully")
        navigate("/login");
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Internal server error")
    } finally {
        setLoader(false);
    }
}

export const logOutUser =(toast,navigate) => (dispatch)=> {
    

    dispatch({
        type:"LOGOUT_USER"
    })
    localStorage.removeItem("auth");
    
    toast.success("User logout succesfully")
    setTimeout(() => navigate("/login"), 0); // NORMAL NAVIGATE IS NOT WORKING WHY IS THAT????????????

}

export const addUpdateUserAddress =
    (sendData,toast,addressId,setOpen) => 
    async (dispatch,getState) =>{

    //const {user} = getState().auth
    dispatch({
        type:"BUTTON_LOADER"
    })

    try {
        if (addressId) {    
            await api.put(`/addresses/${addressId}`,sendData)     
        } 
        else {
            const { data } = await api.post("/addresses",sendData)  
        }
        dispatch(getUserAddresses())
        toast.success("Address saved successfully")
        dispatch({type:"IS_SUCCESS"})
    } catch (error) {
         dispatch({
            type:"IS_ERROR",
            payload:null
        })
        console.log(error);
        toast.error(error.response.data.message || "Internal server error")
    } finally {
        setOpen(false);
    }
        
}

export const getUserAddresses = () => async (dispatch,getState) => {
    try{
        dispatch({ type: "IS_FETCHING" })
        const {data} = await api.get(`/addresses`);
        dispatch({
            type:"FETCH_USER_ADDRESSES",
            payload: data
        })
        dispatch({ type: "IS_SUCCESS" })

    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses!"
        })
        
    }
}

export const selectUserCheckoutAdress=(address)=>{
    localStorage.setItem("CHECKOUT_ADDRESS",JSON.stringify(address))
    return {
        type:"SELECT_CHECKOUT_ADDRESS",
        payload:address
    }
}

export const clearSelectedUserAddress = ()=>{
    return{type:"REMOVE_CHECKOUT_ADDRESS"}
}

export const deleteUserAddress = (sendAddressId,toast,setOpenDeleteModal) => async(dispatch,getState)=>{

    try {
        dispatch({type:"BUTTON_LOADER"})
        await api.delete(`/addresses/${sendAddressId}`)
        dispatch({ 
            type:"FETCH_USER_ADDRESSES",
            payload: data
        })
        dispatch({type:"IS_SUCCESS"})
        dispatch(getUserAddresses())
        dispatch(clearSelectedUserAddress())
        toast.success("Address deleted successfully")

    } catch (error) {
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Error Occured!"
        })
    }
    finally{
        setOpenDeleteModal(false)
    }
}

export const updatePaymentMethod = (method) =>{
    
    localStorage.setItem("PAYMENT_METHOD",method)
    return{
        type:"UPDATE_PAYMENT_METHOD",
        payload:method
    }
}


export const createUserCart = (sendCartItems) => async (dispatch,getState) => {
    try{
        dispatch({ type: "IS_FETCHING" })
        await api.post("/cart/create",sendCartItems)
        await dispatch(getUserCart())
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items!"
        })
        
    }
}

export const getUserCart = () => async (dispatch,getState) => {
    try{
        dispatch({ type: "IS_FETCHING" })
        const {data} = await api.get("/carts/users/cart")

        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice:data.totalPrice,
            cartId: data.cartId
        })
        
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))

        dispatch({type: "IS_SUCCESS"})
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items!"
        })
        
    }
}

export const createStripePaymentSecret = (totalPrice) => async(dispatch,getState) => {

    try {
        dispatch({type:"IS_FETCHING"})

        const {data} = await api.post("/order/stripe-client-secret",{
            "amount":Number(totalPrice) * 100,
            "currency":"usd"
        })

        dispatch({
            type:"CLIENT_SECRET",
            payload:data
        })
        localStorage.setItem("client-secret",JSON.stringify(data))
        dispatch({type:"IS_SUCCESS"})
        
    } catch (error) {
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create stripe payment!"
        })
    }
}

export const stripePaymentConfirmation = (sendData,setErrorMessage,setLoading,toast) => async(dispatch,getState) => {

    try {
        const  response = await api.post("/order/users/payments/online",sendData)
        console.log("ASDFASDFASDGASDFHFADH")
        console.log(response)
        if (response.data) {
            console.log("INSIDE IF")
            localStorage.removeItem("PAYMENT_METHOD")
            localStorage.removeItem("CHECKOUT_ADDRESS")
            localStorage.removeItem("cartItems")
            localStorage.removeItem("client-secret")
            dispatch({type: "REMOVE_CLIENT_SECRET_ADDRESS"})
            dispatch({type: "CLEAR_CART"})
            toast.success("Order accepted")
        }
        else {
            setErrorMessage("Payment failed, Please try again.")
        }

      
    } catch (error) {
        setErrorMessage("Payment failed, Please try again.")
    }
}
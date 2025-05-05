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
        console.log("SAAAAAAAA")
        if(isQuantityExist){
            const newQuantity = currentQuantity+1;
            setCurrentQuantity(newQuantity);
            console.log("ASSSSSSSSS")
            
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


          const newProducts = products.remove(getProduct)
            dispatch({ 
                type: "REMOVE_CART",
                payload: data,
            })
            toast.success(`${data.productName} removed from the cart.`)
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
    
}

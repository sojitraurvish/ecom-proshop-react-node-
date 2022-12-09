import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {productDetailsReducer, productListReducer} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducers"
import { orderCreateReducer, orderDetailsReducer } from "./reducers/orderReducers"

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    user:userLoginReducer,//user ni jagyare userLogin hatu
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer
})

const cartItemsFromStorage=localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfoFromStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromStorage=localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const initialState={
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
    user:{userInfo:userInfoFromStorage},
}

const middleware=[thunk]

const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
// yarn add redux react-redux redux-thunk redux-devtools-extenstion
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  productListReducer as productList,
  productDetailsReducer as productDetails,
} from './reducers/productReducers'

import {
  cartReducer as cart
} from './reducers/cartReducers'

import {
  userLoginReducer as userLogin,
  userRegisterReducer as userRegister,
  userDetailsReducer as userDetails,
  userUpdateProfileReducer as userUpdateProfile,
  userListReducer as userList
} from './reducers/userReducers'

import {
  orderCreateReducer as orderCreate,
  orderDetailsReducer as orderDetails,
  orderPayReducer as orderPay,
  orderListMyReducer as orderListMy
} from './reducers/orderReducers'

const reducer = combineReducers(
  {
    productList,
    productDetails,
    cart,
    userLogin,
    userRegister,
    userDetails,
    userUpdateProfile,
    userList,
    orderCreate,
    orderDetails,
    orderPay,
    orderListMy
  }
)

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store =
  (
    process.env.NODE_ENV === 'development'
      ?
      createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
      :
      createStore(reducer, initialState, applyMiddleware(...middleware))
  )

export default store
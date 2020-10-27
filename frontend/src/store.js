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

const reducer = combineReducers(
  {
    productList,
    productDetails,
    cart
  }
)

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(
      ...middleware
    )
  )
)

export default store
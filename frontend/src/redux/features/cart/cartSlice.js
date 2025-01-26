import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newProduct = {
                _id: action.payload._id,
                title: action.payload.title,
                coverImage: action.payload.coverImage,
                description: action.payload.description,
                category: action.payload.category,
                newPrice: action.payload.newPrice,
                quantity: 1, //initial quantity
            };
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem){
                state.cartItems.push(newProduct);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item added to cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else{
                Swal.fire({
                    title: "Item already exists in cart!",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        incrementQty: (state, action) => {
            const product = state.cartItems.find(product => product._id === action.payload._id);
            if (product) {
                product.quantity += 1;
            }
        },
        decrementQty: (state, action) => {
            const product = state.cartItems.find(product => product._id === action.payload._id);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            } else if (product && product.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id); // Remove product if quantity is 0
            }
        },
    }
})

//export the actions
export const {addToCart, removeFromCart, clearCart, incrementQty, decrementQty} = cartSlice.actions;
export default cartSlice.reducer;
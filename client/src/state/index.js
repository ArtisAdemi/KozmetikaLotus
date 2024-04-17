import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },

        addToCart: (state, action) => {
            const { product } = action.payload;
            const existingProduct = state.cart.find((item) => item.id === product.id);

            if (existingProduct) {
                existingProduct.count++;
            } else {
                state.cart = [...state.cart, { ...product, count: 1 }];
            }
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            const { id } = action.payload;
            const product = state.cart.find((item) => item.id === id);
            if (product) {
                product.count++;
            }
        },

        decreaseCount: (state, action) => {
            const { id } = action.payload;
            const product = state.cart.find((item) => item.id === id);
            if (product && product.count > 1) {
                product.count--;
            }
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        }
    }
})

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen
} = cartSlice.actions;

export default cartSlice.reducer;
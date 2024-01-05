import { ProductItemsTypes } from "@/types/product-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CartItemTypes = ProductItemsTypes & { count: number };

interface InitialStateTypes {
  cart: CartItemTypes[];
}
const initialState: InitialStateTypes = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setToCart: (state, action: PayloadAction<ProductItemsTypes>) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // Якщо елемент вже є в корзині, збільшуємо count на 1
        state.cart[existingItemIndex].count += 1;
      } else {
        // Якщо елементу немає в корзині, додаємо новий об'єкт з count = 1
        state.cart.push({ count: 1, ...action.payload });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.cart = [];
    },
    changeCountCartItem: (
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) => {
      const foundCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (foundCartItemIndex !== -1) {
        // Знайдено товар в корзині за вказаним id
        state.cart[foundCartItemIndex].count = action.payload.count;
      }
    },
  },
});

export const { setToCart, removeFromCart, resetCart, changeCountCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;

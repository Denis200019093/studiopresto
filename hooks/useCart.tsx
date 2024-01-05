import { useMemo } from "react";
import { toast } from "react-toastify";

import { ProductItemsTypes } from "@/types/product-types";
import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  changeCountCartItem,
  removeFromCart,
  resetCart,
  setToCart,
} from "@/redux/slices/cart-slice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const totalAmountCart: number = useMemo(
    () =>
      cart.reduce((sum, product) => {
        return sum + parseFloat(product.price) * product.count;
      }, 0),
    [cart]
  );

  const totalCartCount: number = useMemo(
    () =>
      cart.reduce((totalCount, product) => {
        return totalCount + product.count;
      }, 0),
    [cart]
  );

  const handleSetToCart = (product: ProductItemsTypes) => {
    dispatch(setToCart(product));
    toast("Successfully added to the cart", { type: "success" });
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
    toast("Successfully removed from the cart", { type: "success" });
  };

  const handleResetCart = () => {
    dispatch(resetCart());
    toast("Successfully reset the cart", { type: "success" });
  };

  const handleChangeCountCartItem = (
    cartItemId: number,
    cartItemCount: number
  ) => {
    dispatch(changeCountCartItem({ id: cartItemId, count: cartItemCount }));
    toast("Successfully added count", { type: "success" });
  };

  return {
    totalAmountCart,
    handleSetToCart,
    handleRemoveFromCart,
    handleChangeCountCartItem,
    handleResetCart,
    totalCartCount,
  };
};

export default useCart;

"use client";

import React from "react";
import Link from "next/link";

import ProductItem from "../components/ProductItem";
import { useAppSelector } from "@/hooks/useRedux";
import useCart from "@/hooks/useCart";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const { handleRemoveFromCart, handleResetCart, handleChangeCountCartItem } =
    useCart();

  if (!cart.length) {
    return (
      <h2 className="text-center text-4xl font-semibold">The cart is empty</h2>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <button onClick={() => handleResetCart()} className="primary-btn">
        Reset cart
      </button>
      {cart.map((cartItem, index) => (
        <div className="relative" key={index}>
          <ProductItem key={index} product={cartItem}>
            <div className="absolute top-4 right-10 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button
                    disabled={cartItem.count >= 10}
                  onClick={() =>
                    handleChangeCountCartItem(cartItem.id, cartItem.count + 1)
                  }
                  className="primary-btn w-10"
                >
                  +
                </button>
                <h6>{cartItem.count}</h6>
                <button
                  disabled={cartItem.count <= 1}
                  onClick={() =>
                    handleChangeCountCartItem(cartItem.id, cartItem.count - 1)
                  }
                  className="primary-btn w-10"
                >
                  -
                </button>
              </div>
              <button
                className=" primary-btn"
                onClick={() => handleRemoveFromCart(cartItem.id)}
              >
                Remove
              </button>
            </div>
          </ProductItem>
        </div>
      ))}
      <Link href={"/checkout"}>
        <button className="primary-btn w-full">Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;

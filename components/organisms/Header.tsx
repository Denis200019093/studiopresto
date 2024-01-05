"use client";

import React from "react";
import Link from "next/link";
// Icons
import { BsCart4 } from "react-icons/bs";

import { cn } from "@/utils";
import useCart from "@/hooks/useCart";
import { useAppSelector } from "@/hooks/useRedux";

const Header = () => {
  const { totalAmountCart, totalCartCount } = useCart();
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <header className="flex justify-between border-b border-black py-5 mb-10">
      <h1 className="text-2xl font-semibold">Studiopresto</h1>
      <nav className="flex gap-10">
        <Link href={"/"}>Home</Link>
        <div className="relative">
          <Link className="flex items-center gap-1 text-lg" href={"/cart"}>
            <BsCart4 className="transform -translate-y-0.5" />
            {totalAmountCart.toFixed(2)}$
            <label
              className={cn(
                "-top-4 -right-4 flex justify-center items-center rounded-full w-6 h-6 bg-[#38A7A2]",
                cart.length ? "absolute" : "hidden"
              )}
            >
              {totalCartCount}
            </label>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

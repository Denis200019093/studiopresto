"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import useCart from "@/hooks/useCart";
import { ProductItemsTypes } from "@/types/product-types";

const ProductItem: FC<{ product: ProductItemsTypes; children?: ReactNode }> = ({
  product,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 shadow-md">
      <div className="flex justify-center items-center h-28 overflow-hidden">
        <Link href={`/${product.id}`}>
          <Image
            src={product.image}
            className="object-cover h-auto w-auto"
            alt="Product item"
            width={60}
            height={112}
          />
        </Link>
      </div>
      <Link href={`/${product.id}`}>
        <h5 className="text-lg font-semibold line-clamp-2 h-14">
          {product.title}
        </h5>
      </Link>
      <h6>{product.category}</h6>
      <div className="flex items-center gap-2">
        <label className="font-semibold">Price:</label>
        <h6>{product.price}$</h6>
      </div>
      {children}
    </div>
  );
};

export default ProductItem;

"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import useCart from "@/hooks/useCart";
import { ProductItemsTypes } from "@/types/product-types";
import { useGetProductByIdQuery } from "@/services/products-service";

const ProductDetails = () => {
  const { productId } = useParams();

  const { handleSetToCart } = useCart();

  const {
    data: productDetails,
    isError,
    error,
  } = useGetProductByIdQuery(productId as string);

  if (isError) {
    return <>Something went wrong! {error}</>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-10">Product details</h2>
      <div className="flex gap-4">
        <Image
          src={productDetails?.image!}
          className="object-cover h-auto w-auto"
          alt="Product item"
          width={150}
          height={200}
        />
        <div>
          <h6 className="text-2xl font-semibold">{productDetails?.title}</h6>
          <h6>{productDetails?.category}</h6>
          <h6>{productDetails?.desctiption}</h6>
          <h6>
            Price: <strong>{productDetails?.price}$</strong>
          </h6>
          <button
            className="primary-btn font-semibold w-32"
            onClick={() => handleSetToCart(productDetails as ProductItemsTypes)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

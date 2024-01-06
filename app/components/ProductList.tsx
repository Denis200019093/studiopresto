"use client";

import { useMemo, useState } from "react";

import useCart from "@/hooks/useCart";
import ProductItem from "./ProductItem";
import { useAppSelector } from "@/hooks/useRedux";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetProductsQuery } from "@/services/products-service";

const ProductList = () => {
  const [limit, setLimit] = useState(6);
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 300);

  const { selectedCategory } = useAppSelector((state) => state.categories);

  const { handleSetToCart } = useCart();

  const { data: products, error } = useGetProductsQuery({
    category: selectedCategory!,
    limit,
  });

  // Такий пошук мав бути на стороні клієнта?
  const filteredProducts = useMemo(() => {
    return products?.filter((product) =>
      product.title.includes(debouncedValue)
    );
  }, [debouncedValue, products]);

  return (
    <div className="">
      <div className="flex items-center justify-between border-b pb-2 mb-8">
        <h6 className="font-semibold text-xl ">Products</h6>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Keywords..."
          className="px-4 outline-none rounded-xl"
        />
      </div>

      {error && <h6 className="text-xl">Couldn`t get products</h6>}

      {searchValue && !filteredProducts?.length && (
        <h6 className="text-xl">Nothing found</h6>
      )}

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts?.map((product) => (
            <ProductItem key={product.id} product={product}>
              <button
                onClick={() => handleSetToCart(product)}
                className="primary-btn transition-shadow duration-200 hover:shadow-md"
              >
                Buy
              </button>
            </ProductItem>
          ))}
        </div>

        <div className="text-center mt-6">
          {!debouncedValue && products && limit <= products.length && (
            <button
              className="primary-btn"
              onClick={() => setLimit((prevLimit) => prevLimit + 6)}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

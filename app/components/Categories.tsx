"use client";

import React from "react";
import { useDispatch } from "react-redux";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useRedux";
import { setCategory, resetCategory } from "@/redux/slices/categories-slice";
import { useGetCategoriesQuery } from "@/services/categories-service";

const Categories = () => {
  const { selectedCategory } = useAppSelector((state) => state.categories);

  const { data: categories, isFetching, error } = useGetCategoriesQuery(null);

  const dispatch = useDispatch();

  return (
    <>
      <h6 className="font-semibold text-xl border-b pb-2 mb-8">Categories</h6>

      {error && <h6 className="text-xl">Couldn`t get products</h6>}

      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="flex lg:flex-wrap gap-3 overflow-x-auto">
          {categories?.map((category) => (
            <div
              className={cn(
                "border border-[#38A7A2] p-3 rounded-xl cursor-pointer",
                selectedCategory === category ? "shadow-xl font-semibold" : ""
              )}
              onClick={() => dispatch(setCategory(category))}
              key={category}
            >
              {category}
            </div>
          ))}
          <button
            onClick={() => dispatch(resetCategory())}
            className="underline"
          >
            reset
          </button>
        </div>
      )}
    </>
  );
};

export default Categories;

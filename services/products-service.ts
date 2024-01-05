import { ProductItemsTypes } from "@/types/product-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductItemsTypes[],
      { category: string; limit: number }
    >({
      query: ({ category, limit }) =>
        `/products${category ? `/category/${category}` : ""}?limit=${limit}`,
      providesTags: (result, error, { category, limit }) => [
        { type: "Products", category, limit },
      ],
      serializeQueryArgs: (args) => {
        return args;
      },
      merge: (currentCache, newItems) => {
        currentCache.forEach((currentItem) => {
          newItems.forEach((newItem) => {
            if (currentItem.id !== newItem.id) {
              currentCache.push(newItem);
            }
          });
        });
      },
    }),
    getProductById: builder.query<ProductItemsTypes, string>({
      query: (productId) => `/products/${productId}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;

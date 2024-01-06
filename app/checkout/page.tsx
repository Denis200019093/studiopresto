"use client";

import React from "react";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useAppSelector } from "@/hooks/useRedux";
import ProductItem from "../components/ProductItem";
import { CheckoutTypes, ValidationSchema } from "@/types/validation";

const Checkout = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutTypes>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const submitCheckoutForm: SubmitHandler<CheckoutTypes> = async (e) => {
    console.log(e, cart);

    try {
      await fetch("/api/mail", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ toEmail: e.email }),
      });
      toast("Еhe order is successful", { type: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart.length) {
    return (
      <h2 className="text-center text-4xl font-semibold">The cart is empty</h2>
    );
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit((e) => submitCheckoutForm(e))}
        className="flex flex-col gap-4 basis-5/12"
      >
        <h6 className="text-xl font-semibold">Enter additional info</h6>

        <hr />

        <input
          required
          {...register("fullName")}
          placeholder="Full name"
          className="outline-none p-2 border"
        />
        {errors.fullName && <label>{errors.fullName.message}</label>}

        <input
          required
          type="email"
          {...register("email")}
          placeholder="Email"
          className="outline-none p-2 border"
        />
        {errors.email && <label>{errors.email.message}</label>}

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputMask
              {...field}
              required
              mask="+38 (99) 999-99-99"
              placeholder="+38 (__) ___-__-__"
              className="p-2 border rounded"
            />
          )}
        />
        {errors.phone && <label>{errors.phone.message}</label>}

        <div>
          {cart.map((cartItem) => (
            <ProductItem key={cartItem.id} product={cartItem} />
          ))}
        </div>

        <button className="primary-btn">Submit</button>
      </form>
    </div>
  );
};

export default Checkout;

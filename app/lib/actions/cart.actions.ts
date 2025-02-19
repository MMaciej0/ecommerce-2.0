"use server";

import { cookies } from "next/headers";
import { connectToDB } from "../db";

import Cart from "../db/models/cart.model";
import { serializeMongoData, toSmallestUnit } from "../utils/utils";
import { PopulatedCart } from "../validators/cart";
import CartItem from "../db/models/cartItem.model";
import { ServerActionResponse } from "../validators/base";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

export const getCart = async (): Promise<PopulatedCart | null> => {
  await connectToDB();
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) return null;

  const cart = await Cart.findOne({ _id: cartId })
    .populate({
      path: "cartItems",
      populate: {
        path: "product",
        select: "name price countInStock",
      },
    })
    .select("-__v")
    .lean();

  if (!cart) {
    return null;
  }

  const formated = serializeMongoData(cart) as unknown as PopulatedCart;
  return formated;
};

export const createCart = async (): Promise<PopulatedCart> => {
  await connectToDB();

  const cart = await Cart.create({ cartItems: [] });
  const plainCart = cart.toObject();

  const serializedCart = serializeMongoData(
    plainCart,
  ) as unknown as PopulatedCart;

  const cookieStore = await cookies();
  cookieStore.set("cartId", serializedCart._id, {
    maxAge: 60 * 60 * 24 * 30,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });

  return serializedCart;
};

export const addToCart = async (
  productId: string,
  quantity: number,
  price: number,
  replace: boolean = false,
): Promise<ServerActionResponse> => {
  try {
    await connectToDB();

    const cart = (await getCart()) || (await createCart());

    const existingCartItem = cart.cartItems.find(
      (item) => item.product._id.toString() === productId,
    );

    if (existingCartItem) {
      await CartItem.updateOne(
        {
          _id: existingCartItem._id,
        },
        {
          quantity: replace ? quantity : existingCartItem.quantity + quantity,
        },
      );
    } else {
      const newCartItem = await CartItem.create({
        product: productId,
        quantity,
        cartId: cart._id,
        price: toSmallestUnit(price),
      });
      await Cart.findByIdAndUpdate(cart._id, {
        $push: { cartItems: newCartItem._id },
      });
    }

    revalidatePath("/products/[slug]", "page");

    return { success: true, message: "Product added to cart." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Unable to add your product to cart. Please try again.",
    };
  }
};

export const removeFromCart = async (
  cartItemId: string,
): Promise<ServerActionResponse> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectToDB();

    const cart = (await getCart()) || (await createCart());

    await CartItem.deleteOne({ _id: cartItemId }).session(session);

    await Cart.findByIdAndUpdate(
      cart._id,
      { $pull: { cartItems: cartItemId } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    revalidatePath("/");

    return { success: true, message: "Product removed from cart." };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return {
      success: false,
      message: "Unable to remove your product from cart. Please try again.",
    };
  }
};

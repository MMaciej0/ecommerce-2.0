"use server";

import { cookies } from "next/headers";
import { connectToDB } from "../db";

import Cart from "../db/models/cart.model";
import { serializeMongoData, toSmallestUnit } from "../utils/utils";
import { PopulatedCart } from "../validators/cart";
import CartItem from "../db/models/cartItem.model";
import { ServerActionResponse } from "../validators/base";
import { revalidatePath } from "next/cache";

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
  cookieStore.set("cartId", serializedCart._id);

  return serializedCart;
};

export const addToCart = async (
  productId: string,
  quantity: number,
  price: number,
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
          quantity: existingCartItem.quantity + quantity,
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

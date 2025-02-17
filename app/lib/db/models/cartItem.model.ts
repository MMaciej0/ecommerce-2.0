import { model, Model, models, Schema, Types } from "mongoose";

export interface DBCartItem {
  _id: Types.ObjectId;
  cartId: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<DBCartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const CartItem =
  (models.CartItem as Model<DBCartItem>) ||
  model<DBCartItem>("CartItem", cartItemSchema);

export default CartItem;

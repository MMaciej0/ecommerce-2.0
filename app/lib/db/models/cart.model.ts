import { model, Model, models, Schema, Types } from "mongoose";

export interface DBCart {
  _id: Types.ObjectId;
  user: Types.ObjectId | null;
  cartItems: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<DBCart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
  },
  { timestamps: true },
);

const Cart =
  (models.Cart as Model<DBCart>) || model<DBCart>("Cart", cartSchema);

export default Cart;

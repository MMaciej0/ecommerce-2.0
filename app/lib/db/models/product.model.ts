import { model, Model, models, Schema, type Document } from "mongoose";
import type { ProductInput } from "../../validators/product";

export interface DBProduct extends Document, ProductInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<DBProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    tags: {
      type: [String],
      default: ["new"],
    },
    avgRaring: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        default: [],
      },
    ],
    numSeles: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  (models.Product as Model<DBProduct>) ||
  model<DBProduct>("Product", productSchema);

export default Product;

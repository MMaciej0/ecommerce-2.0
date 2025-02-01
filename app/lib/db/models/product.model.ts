import { model, Model, models, Schema, Types, Document } from "mongoose";

export interface DBProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  category: Types.ObjectId;
  description?: string;
  isPublished: boolean;
  countInStock: number;
  tags: string[];
  avgRating: number;
  numReviews: number;
  reviews: Types.ObjectId[];
  numSales: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<DBProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, trim: true },
    isPublished: { type: Boolean, default: false },
    countInStock: { type: Number, required: true, default: 0 },
    tags: { type: [String], default: ["new"] },
    avgRating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
    numSales: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product =
  (models.Product as Model<DBProduct>) ||
  model<DBProduct>("Product", productSchema);

export default Product;

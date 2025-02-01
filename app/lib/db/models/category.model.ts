import { model, Model, models, Schema, Types, Document } from "mongoose";

interface DBCategory extends Document {
  _id: Types.ObjectId;
  name: string;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<DBCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Category =
  (models.Category as Model<DBCategory>) ||
  model<DBCategory>("Category", categorySchema);

export default Category;

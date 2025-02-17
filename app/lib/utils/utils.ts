import { type ClassValue, clsx } from "clsx";
import { Types } from "mongoose";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export const toSmallestUnit = (price: number): number =>
  Math.round(price * 100);
export const toDecimalUnit = (price: number): number =>
  parseFloat((price / 100).toFixed(2));

interface Data {
  _id: Types.ObjectId;
  price?: number;
}

export const serializeMongoData = <T extends Data | Data[]>(data: T): T => {
  if (Array.isArray(data)) {
    return data.map((item) => serializeMongoData(item)) as T;
  }

  if (!data._id) {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serialized: any = {
    ...data,
    _id: data._id.toString(),
  };

  if (data.price) {
    serialized.price = toDecimalUnit(data.price);
  }

  for (const key in serialized) {
    const value = serialized[key];

    if (value instanceof Types.ObjectId) {
      serialized[key] = value ? value.toString() : null;
    } else if (Array.isArray(value)) {
      serialized[key] = value.map((item) =>
        item instanceof Types.ObjectId
          ? item.toString()
          : item
            ? serializeMongoData(item)
            : null,
      );
    } else if (typeof value === "object" && value !== null) {
      serialized[key] = serializeMongoData(value);
    }
  }

  return serialized as T;
};

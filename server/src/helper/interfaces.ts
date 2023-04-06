import { Types } from "mongoose";
export interface IProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  quantitySold: number;
  imageName: string;
}

export interface JwtUserInfo {
  id: Types.ObjectId;
  number: number;
  role: string;
}

export interface IAddress {
  name: string;
  number: string;
  city: string;
  landmark?: string;
}

export interface IOrder {
  _id: string;
  userId: string;
  orderAt: Date;
  paymentType: string;
  paymentStatus: string;
  products: IProduct[];
  address: IAddress;
  totalPrice: number;
  paymentId?: string | null;
  orderStatus: "processing" | "packed" | "out for delivery" | "delivered";
}

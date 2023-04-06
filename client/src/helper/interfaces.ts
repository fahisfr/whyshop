export interface IProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageName: string;
}

interface ICartProduct extends IProduct {
  selectedQuantity:number
}
export interface IUser {
  name: string;
  number: string;
  role: string;
  cart: ICartProduct[];
}

export interface IChangeProductQuantity {
  productId: string;
  quantity: number;
  price: number;
}

export interface IAddress {
  name: string;
  number: string;
  secondaryNumber: string;
  city: string;
  landMark: string;
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

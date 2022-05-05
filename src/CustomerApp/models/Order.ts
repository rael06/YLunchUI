export enum OrderState {
  Idling,
  Acknowledged,
  InPreparation,
  Ready,
  Delivered,
  Other,
  Cancelled,
  Rejected,
}

export type OrderStatus = {
  id: string;
  orderId: string;
  orderState: OrderState;
  dateTime: Date;
};

export type OrderedProduct = {
  id: string;
  productId: string;
  restaurantId: string;
  orderId: string;
  userId: string;
  name: string;
  description: string;
  allergens: string;
  productTags: string;
  price: number;
  productType: 0;
  creationDateTime: Date;
  expirationDateTime: Date;
  image: string;
};

export type OrderReadDto = {
  id: string;
  userId: string;
  restaurantId: string;
  totalPrice: number;
  creationDateTime: Date;
  reservedForDateTime: Date;
  acceptationDateTime: Date;
  customerComment: string;
  restaurantComment: string;
  isAcknowledged: true;
  isAccepted: true;
  isDeleted: true;
  CurrentOrderStatus: OrderStatus;
  OrderStatuses: OrderStatus[];
  OrderedProducts: OrderedProduct[];
};

export type OrderCreateDto = {
  productIds: string[];
  reservedForDateTime: Date;
  customerComment: string;
};

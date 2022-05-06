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

export type OrderStatusReadDto = {
  id: string;
  orderId: string;
  orderState: OrderState;
  dateTime: Date;
};

export type OrderedProductReadDto = {
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
  currentOrderStatus: OrderStatusReadDto;
  orderStatuses: OrderStatusReadDto[];
  orderedProducts: OrderedProductReadDto[];
};

export type OrderCreateDto = {
  productIds: string[];
  reservedForDateTime: Date;
  customerComment: string;
};

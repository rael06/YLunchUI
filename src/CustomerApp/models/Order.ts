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
  dateTime: string;
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
  creationDateTime: string;
  expirationDateTime: string;
  image: string;
};

export type OrderReadDto = {
  id: string;
  userId: string;
  restaurantId: string;
  totalPrice: number;
  creationDateTime: string;
  reservedForDateTime: string;
  acceptationDateTime: string;
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
  reservedForDateTime: string;
  customerComment: string;
};

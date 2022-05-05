export type ProductReadDto = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  isActive: boolean;
  productType: ProductType;
  expirationDateTime: Date;
  image: string;
  allergens: AllergenReadDto[];
  productTags: ProductTagReadDto[];
};

export type AllergenReadDto = {
  id: string;
  name: string;
};

export type ProductTagReadDto = {
  id: string;
  name: string;
};

export enum ProductType {
  Starter,
  Main,
  Dessert,
  Drink,
  Menu,
  Daily,
  Other,
}

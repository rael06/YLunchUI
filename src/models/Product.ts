export type ProductReadDto = {
  id: string;
  name: string;
  description: string;
  price: 9.8;
  quantity: 3;
  isActive: boolean;
  productType: ProductType;
  expirationDateTime: DateConstructor;
  image: string;
  allergens: AllergenReadDto[];
  productTags: ProductReadDto[];
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

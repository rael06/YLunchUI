import React from "react";
import { useQuery } from "react-query";
import { ProductReadDto, ProductType } from "../../../models/Product";
import { getProductsApi } from "../../services/api/products";
import ProductsByType from "./ProductsByType";

type Props = {
  restaurantId: string;
};

export default function Products({ restaurantId }: Props) {
  const { data: products } = useQuery("products", () =>
    getProductsApi({ restaurantId: restaurantId! })
  );

  const classifiedProductsByType: Record<
    "starter" | "main" | "dessert" | "drink" | "menu" | "daily" | "other",
    ProductReadDto[]
  > = React.useMemo(
    () =>
      products
        ? {
            starter: products.filter(
              (product) => product.productType === ProductType.Starter
            ),
            main: products.filter(
              (product) => product.productType === ProductType.Main
            ),
            dessert: products.filter(
              (product) => product.productType === ProductType.Dessert
            ),
            drink: products.filter(
              (product) => product.productType === ProductType.Drink
            ),
            menu: products.filter(
              (product) => product.productType === ProductType.Menu
            ),
            daily: products.filter(
              (product) => product.productType === ProductType.Daily
            ),
            other: products.filter(
              (product) => product.productType === ProductType.Other
            ),
          }
        : {
            starter: [],
            main: [],
            dessert: [],
            drink: [],
            menu: [],
            daily: [],
            other: [],
          },
    [products]
  );

  if (!restaurantId || !products) {
    return <></>;
  }

  return (
    <div>
      {classifiedProductsByType.starter.length > 0 && (
        <ProductsByType
          title="Entrées"
          products={classifiedProductsByType.starter}
        />
      )}
      {classifiedProductsByType.main.length > 0 && (
        <ProductsByType
          title="Plats"
          products={classifiedProductsByType.main}
        />
      )}
      {classifiedProductsByType.dessert.length > 0 && (
        <ProductsByType
          title="Desserts"
          products={classifiedProductsByType.dessert}
        />
      )}
      {classifiedProductsByType.drink.length > 0 && (
        <ProductsByType
          title="Boissons"
          products={classifiedProductsByType.drink}
        />
      )}
      {classifiedProductsByType.menu.length > 0 && (
        <ProductsByType
          title="Menus"
          products={classifiedProductsByType.menu}
        />
      )}
      {classifiedProductsByType.daily.length > 0 && (
        <ProductsByType
          title="Plats du jour"
          products={classifiedProductsByType.daily}
        />
      )}
      {classifiedProductsByType.other.length > 0 && (
        <ProductsByType
          title="Autres"
          products={classifiedProductsByType.other}
        />
      )}
    </div>
  );
}

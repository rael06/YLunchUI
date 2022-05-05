import {
  apiUrl,
  getAnonymousHeaders,
  restMethods,
} from "../../../common/services/api/helpers";
import { ProductReadDto } from "../../../models/Product";

type GetProductsApiParams = {
  restaurantId: string;
  productIds?: string[];
  isAvailable?: boolean;
};

export async function getProductsApi({
  restaurantId,
  productIds,
  isAvailable,
}: GetProductsApiParams): Promise<ProductReadDto[]> {
  const productIdsParam =
    productIds?.map((id) => `productIds=${id}`).join("&") ?? "";

  const params = `${productIdsParam}${
    isAvailable !== undefined ? `&isAvailable=${isAvailable}` : ""
  }`;
  const response = await fetch(
    `${apiUrl}/restaurants/${restaurantId}/products?${params}`,
    {
      method: restMethods.get,
      headers: getAnonymousHeaders(),
    }
  );
  return response.json();
}

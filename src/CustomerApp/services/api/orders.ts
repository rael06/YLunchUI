import {
  apiUrl,
  getAuthorizedHeaders,
  processResponse,
  restMethods,
} from "../../../common/services/api/helpers";
import { OrderCreateDto, OrderReadDto } from "../../models/Order";

export async function addOrderApi(
  restaurantId: string,
  order: OrderCreateDto
): Promise<OrderReadDto> {
  return fetch(`${apiUrl}/restaurants/${restaurantId}/orders`, {
    method: restMethods.post,
    headers: await getAuthorizedHeaders(),
    body: JSON.stringify(order),
  }).then(async (response) => await processResponse(response));
}

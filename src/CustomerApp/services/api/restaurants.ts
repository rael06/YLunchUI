import { RestaurantReadDto } from "../../../common/models/Restaurant";
import {
  apiUrl,
  restMethods,
  getAnonymousHeaders,
  processResponse,
} from "../../../common/services/api/helpers";

export async function getRestaurants(): Promise<RestaurantReadDto[]> {
  return fetch(`${apiUrl}/restaurants`, {
    method: restMethods.get,
    headers: getAnonymousHeaders(),
  }).then(async (response) => await processResponse(response));
}

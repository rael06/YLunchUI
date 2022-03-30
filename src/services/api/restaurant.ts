import { RestaurantReadDto } from "../../models/Restaurant";
import { apiUrl, restMethods, getAnonymousHeaders } from "./common";

export async function getRestaurants(): Promise<RestaurantReadDto[]> {
  const response = await fetch(`${apiUrl}/restaurants`, {
    method: restMethods.get,
    headers: getAnonymousHeaders(),
  });
  return response.json();
}

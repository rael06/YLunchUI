import { UserReadDto } from "../../../common/models/Authentication";
import {
  apiUrl,
  getAnonymousHeaders,
  processResponse,
  restMethods,
} from "../../../common/services/api/helpers";
import { CustomerCreateDto } from "../../models/Customer";

export async function addCustomerApi(
  login: CustomerCreateDto
): Promise<UserReadDto> {
  return fetch(`${apiUrl}/customers`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify(login),
  }).then(async (response) => await processResponse(response));
}

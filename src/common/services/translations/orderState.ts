import { OrderState } from "../../../CustomerApp/models/Order";

const translatedOrderStates: Record<OrderState, string> = {
  0: "En attente de validation",
  1: "Validée par le restaurant",
  2: "En cours de préparation",
  3: "Prête",
  4: "Délivrée",
  5: "Autre",
  6: "Annulée",
  7: "Rejetée",
};

export function translateOrderState(orderState: OrderState) {
  return translatedOrderStates[orderState];
}

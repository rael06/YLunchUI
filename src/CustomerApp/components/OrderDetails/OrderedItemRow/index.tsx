import { TableCell, TableRow } from "@mui/material";
import { OrderedProductReadDto } from "../../../models/Order";

export type OrderedItem = {
  orderedProduct: OrderedProductReadDto;
  quantity: number;
};

type Props = {
  orderedItem: OrderedItem;
};

export default function OrderedItemRow({ orderedItem }: Props) {
  const { orderedProduct, quantity } = orderedItem;

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {orderedProduct.name}
      </TableCell>
      <TableCell>{quantity.toString().padStart(2, "0")}</TableCell>
      <TableCell>
        {`${(orderedProduct.price * quantity).toFixed(2)}`.padStart(2, "0")} €
      </TableCell>
    </TableRow>
  );
}

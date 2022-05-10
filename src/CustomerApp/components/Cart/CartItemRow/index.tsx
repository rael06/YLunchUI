import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import { ProductReadDto } from "../../../../models/Product";
import { CartItem } from "../../../contexts/CartContext";

type Props = {
  cartItem: CartItem;
  addProduct: (product: ProductReadDto) => void;
  removeProduct: (product: ProductReadDto) => void;
};

export default function CartItemRow({
  cartItem,
  addProduct,
  removeProduct,
}: Props) {
  const { product, quantity } = cartItem;

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {product.name}
      </TableCell>
      <TableCell align="center">
        {quantity.toString().padStart(2, "0")}
      </TableCell>
      <TableCell align="center">
        {`${(product.price * quantity).toFixed(2)}`.padStart(2, "0")} €
      </TableCell>
      <TableCell align="center">
        <Button onClick={() => removeProduct(product)}>
          <RemoveCircleOutline />
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button onClick={() => addProduct(product)}>
          <AddCircleOutline />
        </Button>
      </TableCell>
    </TableRow>
  );
}

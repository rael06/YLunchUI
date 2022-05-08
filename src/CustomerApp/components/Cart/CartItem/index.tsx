import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, TableCell } from "@mui/material";
import { ProductReadDto } from "../../../../models/Product";

type Props = {
  product: ProductReadDto;
  quantity: number;
  addProduct: (product: ProductReadDto) => void;
  removeProduct: (product: ProductReadDto) => void;
};

export default function CartItem({
  product,
  quantity,
  addProduct,
  removeProduct,
}: Props) {
  return (
    <>
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
    </>
  );
}

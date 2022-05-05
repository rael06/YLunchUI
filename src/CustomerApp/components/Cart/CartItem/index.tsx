import { Box, Button, Typography } from "@mui/material";
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
    <Box sx={{ display: "flex" }}>
      <Typography>{product.name}</Typography>
      <Typography ml={2}>{quantity}</Typography>
      <Button onClick={() => removeProduct(product)}>-</Button>
      <Button onClick={() => addProduct(product)}>+</Button>
      <Typography ml={2}>
        {`${(product.price * quantity).toFixed(2)}`.padStart(2, "0")}
      </Typography>
    </Box>
  );
}

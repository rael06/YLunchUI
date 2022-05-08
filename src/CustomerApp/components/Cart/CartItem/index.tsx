import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography>{product.name}</Typography>
      <Typography ml={2}>{quantity}</Typography>
      <Typography ml={2}>
        {`${(product.price * quantity).toFixed(2)}`.padStart(2, "0")} €
      </Typography>
      <Button onClick={() => removeProduct(product)} sx={{ marginLeft: 3 }}>
        <RemoveCircleOutline />
      </Button>
      <Button onClick={() => addProduct(product)}>
        <AddCircleOutline />
      </Button>
    </Box>
  );
}

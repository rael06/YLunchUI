import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { ProductReadDto } from "../../../../../models/Product";
import useCart from "../../../../hooks/useCart";
import imgdefault from "./img-product.png";

type Props = {
  product: ProductReadDto;
};

export default function ProductCard({ product }: Props) {
  const { name, image, description, price, allergens } = product;
  const { addProduct } = useCart();

  return (
    <Card sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}>
      <CardMedia
        component="img"
        src={image !== null ? image : imgdefault}
        alt="icone ynov"
        height="140"
        sx={{
          objectFit: "contain",
        }}
      />
      <CardContent>
        <Box
          mb={2}
          component="div"
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mr: 5, minHeight: "3.5rem" }}>
            {name}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
            {price.toFixed(2)} €
          </Typography>
        </Box>
        <Box component="div">
          <Box component="div" sx={{ fontWeight: "bold", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Compositions:{" "}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Box>
          <Box component="div" sx={{ fontWeight: "bold" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Allergènes:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "flex" }}>
              {allergens.map((allergen) => allergen.name).join(", ")}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ marginLeft: "auto", marginTop: "auto" }}>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "none" }}
          onClick={() => addProduct(product)}
        >
          Réserver
        </Button>
      </CardActions>
    </Card>
  );
}

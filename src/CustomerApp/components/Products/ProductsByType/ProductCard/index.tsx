import { Remove } from "@mui/icons-material";
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
import placeholderImage from "./product-placeholder-image.png";

type Props = {
  product: ProductReadDto;
};

export default function ProductCard({ product }: Props) {
  const { name, image, description, price, allergens } = product;
  const { addProduct } = useCart();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        src={image !== null ? image : placeholderImage}
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mr: 5, minHeight: "3.5rem" }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
          >
            {price.toFixed(2)} €
          </Typography>
        </Box>
        <Box component="div">
          <Box component="div" sx={{ fontWeight: "bold", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Compositions:{" "}
            </Typography>
            <Typography variant="body2">{description ?? <Remove />}</Typography>
          </Box>
          <Box component="div" sx={{ fontWeight: "bold" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Allergènes:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "flex" }}>
              {allergens.length > 0 ? (
                allergens.map((allergen) => allergen.name).join(", ")
              ) : (
                <Remove />
              )}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ marginLeft: "auto", marginTop: "auto" }}>
        <Button
          variant="contained"
          onClick={() => addProduct(product)}
          sx={{ backgroundColor: "#26989bd4" }}
        >
          Réserver
        </Button>
      </CardActions>
    </Card>
  );
}

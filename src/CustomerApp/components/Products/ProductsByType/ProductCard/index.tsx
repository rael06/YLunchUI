import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { ProductReadDto } from "../../../../../models/Product";

type Props = {
  product: ProductReadDto;
};

export default function ProductCard({ product }: Props) {
  const { name, description, price } = product;
  return (
    <Card>
      <CardMedia component="img" alt="icone ynov" height="140" />
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography mb={2} variant="subtitle2" component="div">
          {name}
          <Typography variant="body2">{description}</Typography>
        </Typography>
        <Typography variant="subtitle2" component="p">
          {price}
        </Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button variant="contained" size="small" sx={{ textTransform: "none" }}>
          {" "}
          Voir plus
        </Button>
      </CardActions>
    </Card>
  );
}

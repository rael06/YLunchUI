import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ProductReadDto } from "../../../../models/Product";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  products: ProductReadDto[];
};

export default function ProductsByType({ title, products }: Props) {
  return (
    <>
      <Box sx={{ p: 2, backgroundColor: "#FF914D" }}>
        <Typography variant="h4" component="h2" sx={{color: 'white'}}>
          {title}
        </Typography>
      </Box>
      <Grid container sx={{ px: 2, my: 4, mx: 1 }} columnSpacing={{ sm: 2 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

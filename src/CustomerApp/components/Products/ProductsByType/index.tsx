import { ProductReadDto } from "../../../../models/Product";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  products: ProductReadDto[];
};

export default function ProductsByType({ title, products }: Props) {
  return (
    <div>
      <p>{title}</p>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

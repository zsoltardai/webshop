import Variant from './Variant';
import Meta from './Meta';


type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  variants?: Variant[];
};

export default Product;

export type GetProductsResponse = {
  products: Product[];
  meta: Meta;
};

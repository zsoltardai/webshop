import Variant from './Variant';


type Product = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  images: string[];
  price: number;
  variants?: Variant[];
};

export default Product;

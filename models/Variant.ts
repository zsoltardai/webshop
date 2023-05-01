type Variant = {
  id: number;
  slug: string;
  description: string;
  name: string;
  price: number;
  images?: string[];
  attributes?: {[key: string]: string};
};

export default Variant;

import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient, Prisma} from '@prisma/client';

import {Product, Variant} from '@webshop/models';


const productQuery = {
  select: {
    id: true,
    slug: true,
    name: true,
    description: true,
    categories: {
      select: {
        name: true,
        description: true,
      },
    },
    productVariants: {
      select: {
        id: true,
        name: true,
        price: true,
        attributes: true,
        productImages: {
          select: {
            imageUrl: true,
          },
        },
      },
    },
  },
};

type GetProductQueryResult = Prisma.productsGetPayload<typeof productQuery>;

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const {slug} = req.query;

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {

    case 'GET':
      const product = await client.products.findFirst({
        where: {slug: slug as string},
        ...productQuery,
      });

      if (!product) {
        res.status(404).send(`We couldn't find a product with the provided slug: ${slug}!`);
        return;
      }

      res.status(200).json(getProduct(product));
      return;

    default: 
      res.status(405).send('Only GET method is allowed!');
      return;
  }
};

const getProduct = (object: GetProductQueryResult): Product => {

  const price: number = Number(object.productVariants?.[0].price);

  const images: string[] = [];

  object.productVariants.forEach(
    (variant): void => {
      variant.productImages.forEach(
        (image) => images.push(image.imageUrl),
      );
    },
  );

  const variants: Variant[] = object.productVariants.map(
    (variant) => {
      return {
        id: variant.id,
        slug: object.slug,
        name: variant.name,
        description: object.description,
        price: Number(variant.price),
        attributes: variant.attributes as {[key: string]: string},
        images: variant.productImages.map((image) => image.imageUrl),
      };
    },
  );

  return {
    id: object.id,
    slug: object.slug,
    name: object.name,
    description: object.description || '',
    images,
    price,
    variants,
  };
};

export default handler;

import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient, Prisma} from '@prisma/client';

import {Product, Variant} from '@webshop/models';


const productQuery = {
  select: {
    id: true,
    slug: true,
    name: true,
    description: true,
    category: {
      select: {
        name: true,
        description: true,
      },
    },
    variants: {
      select: {
        id: true,
        name: true,
        price: true,
        attributes: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    },
  },
};

type GetProductQueryResult = Prisma.ProductGetPayload<typeof productQuery>;

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const {slug} = req.query;

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {

    case 'GET':
      let product;

      try {
        product = await client.product.findFirst({
          where: {slug: slug as string},
          ...productQuery,
        });
      } catch (error: any) {
        console.log(error.message);
        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

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

  const price: number = Number(object.variants?.[0].price);

  const images: string[] = [];

  object.variants.forEach(
    (variant): void => {
      variant.images.forEach(
        (image) => images.push(image.url),
      );
    },
  );

  const variants: Variant[] = object.variants.map(
    (variant) => {
      return {
        id: variant.id,
        slug: object.slug,
        name: variant.name,
        description: object.description,
        price: Number(variant.price),
        attributes: variant.attributes as {[key: string]: string},
        images: variant.images.map((image) => image.url),
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

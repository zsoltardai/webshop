import {NextApiRequest, NextApiResponse} from 'next';

import {Prisma, PrismaClient} from '@prisma/client';

import type {Variant} from '@webshop/models';


const variantQuery = {
  select: {
    id: true,
    name: true,
    price: true,
    attributes: true,
    products: {
      select: {
        slug: true,
        description: true,
      },
    },
    productImages: {
      select: {
        imageUrl: true,
      },
    },
  },
};

type GetVariantQueryResult = Prisma.productVariantsGetPayload<typeof variantQuery>;

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const {id} = req.query;

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {

    case 'GET':

      const productVariant = await client.productVariants.findFirst({
        where: {id: Number(id)},
        ...variantQuery,
      });

      if (!productVariant) {
        res.status(404).send(`We couldn't find product variant with the id: ${id}!`);
        return;
      }
    
      res.status(200).json(getVariant(productVariant));
      return;

    default:

      res.status(405).send(`The ${req.method} method is allowed!`);
      return;
  };
};

const getVariant = (object: GetVariantQueryResult): Variant => {

  const images: string[] = object.productImages.map(
    (image) => image.imageUrl,
  );

  return {
    id: object.id,
    description: object.products.description,
    slug: object.products.slug,
    name: object.name,
    price: Number(object.price),
    images,
    attributes: object.attributes as Prisma.JsonObject,
  };
};

export default handler;

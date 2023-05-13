import {NextApiRequest, NextApiResponse} from 'next';

import {Prisma} from '@prisma/client';

import {client} from '@webshop/prisma/client';

import type {Variant} from '@webshop/models';


export const variantQuery = {
  select: {
    id: true,
    name: true,
    price: true,
    attributes: true,
    product: {
      select: {
        slug: true,
      },
    },
    images: {
      select: {
        url: true,
      },
    },
  },
};

type GetVariantQueryResult = Prisma.VariantGetPayload<typeof variantQuery>;

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const {id} = req.query;

  switch (req.method) {

    case 'GET':

      let variant;

      try {
        variant = await client.variant.findFirst({
          where: {id: Number(id)},
          ...variantQuery,
        });
      } catch (error: any) {

        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

      if (!variant) {
        res.status(404).send(`We couldn't find product variant with the id: ${id}!`);
        return;
      }
    
      res.status(200).json(getVariant(variant));
      return;

    default:

      res.status(405).send(`The ${req.method} method is allowed!`);
      return;
  };
};

const getVariant = (object: GetVariantQueryResult): Variant => {

  const images: string[] = object.images.map(
    (image) => image.url,
  );

  return {
    id: object.id,
    slug: object.product.slug,
    name: object.name,
    price: Number(object.price),
    images,
    attributes: object.attributes as {[key: string]: string},
  };
};

export default handler;

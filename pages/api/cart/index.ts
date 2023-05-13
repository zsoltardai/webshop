import {NextApiRequest, NextApiResponse} from 'next';

import {verifyJWT} from '@webshop/helpers/verifyJWT';

import {client} from '@webshop/prisma/client';

import {variantQuery} from '@webshop/pages/api/variants/[id]';


export const cartItemQuery = {
  select: {
    id: true,
    quantity: true,
    variant: {
      ...variantQuery,
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
  
  const content = await verifyJWT(req, res);

  if (!content) return;

  const {id} = content;

  switch (req.method) {

    case 'GET': {

      const cartItems = await client.cartItem.findMany({
        where: {userId: Number(id)},
        ...cartItemQuery,
      });

      res.status(200).json(cartItems);
      return;
    }

    case 'DELETE': {

      await client.cartItem.deleteMany({where: {userId: Number(id)}});

      res.status(204).send('');
      return;
    }

    case 'POST': {

      if (!await validatePostRequestBody(req, res)) return;

      const {variantId, quantity} = req.body;

      let cartItem;

      try {
        cartItem = await client.cartItem.upsert({
          where: {
            variantId_userId: {
              variantId: Number(variantId),
              userId: Number(id),
            },
          },
          update: {
            quantity: Number(quantity),
          },
          create: {
            userId: Number(id),
            variantId: Number(variantId),
            quantity: Number(quantity),
          },
          ...cartItemQuery,
        });
      } catch (error) {
        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

      res.status(201).json(cartItem);
      return;
    }

    default:
      return res.status(405).send('DEFAULT!');
  };
};

const validatePostRequestBody = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<boolean> => {

  const {variantId, quantity} = req.body;

  if (!variantId || typeof variantId !== 'number') {
    res.status(400).send('You did not provide a valid variant attribute!');
    return false;
  }

  const variant = await client.variant.findFirst({where: {id: Number(variantId)}});

  if (!variant) {
    res.status(400).send('You did not provide a valid variant attribute!');
    return false;
  }

  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    res.status(400).send('You did not provide a valid quantity attribute!');
    return false;
  }

  return true;
};


export default handler;

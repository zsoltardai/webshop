import {NextApiRequest, NextApiResponse} from 'next';

import {verifyJWT} from '@webshop/helpers/verifyJWT';

import {client} from '@webshop/prisma/client';

import {cartItemQuery} from '@webshop/pages/api/cart';


const handler = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {

  const content = await verifyJWT(req, res);

  if (!content) return;

  const {id: userId} = content;

  const {id} = req.query;

  switch (req.method) {

    case 'GET': {

      let cartItem;

      try {
        cartItem = await client.cartItem.findFirst({
          ...cartItemQuery,
          where: {
            id: Number(id),
            userId: Number(userId),
          },
        });
      } catch (error: any) {
        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

      if (!cartItem) {
        res.status(404).send(`There is not cart item with the id: ${id}!`);
        return;
      }

      res.status(200).json(cartItem);
      return;
    }

    case 'PUT': {

      if (!await validatePutRequestBody(req, res)) return;

      const {quantity} = req.body;

      let cartItem;

      try {
        cartItem = await client.cartItem.update({
          ...cartItemQuery,
          where: {id: Number(id)},
          data: {
            quantity: Number(quantity),
          },
        });
      } catch ({code}: any) {
        if (code === 'P2025') {
          res.status(404).send(`There is no cart item with the provided id: ${id}!`);
          return;
        }

        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

      res.status(202).json(cartItem);
      return;
    }

    case 'DELETE': {
      try {
        await client.cartItem.delete({where: {id: Number(id)}});
      } catch ({code}: any) {
        if (code === 'P2025') {
          res.status(404).send(`There is no cart item with the provided id: ${id}!`);
          return;
        }

        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

      res.status(204).json('');
      return;
    }

    default:
      res.status(405).send('Only PUT, DELETE and GET requests are allowed!');
  }
};

const validatePutRequestBody = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<boolean> => {

  const {quantity} = req.body;

  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    res.status(400).send('You did not provide a valid quantity attribute!');
    return false;
  }

  return true;
};

export default handler;

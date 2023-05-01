
import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient, Prisma} from '@prisma/client';

import {verify} from '@webshop/utils/jwt';

import type {Item} from '@webshop/models/Cart';


const cartQuery = {
  select: {
    variantId: true,
    quantity: true,
  },
};

type GetCartQueryResult = Prisma.cartsGetPayload<typeof cartQuery>;

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {
  
  const client: PrismaClient = new PrismaClient();

  const token: string = req.headers['authorization'] as string;

  const {id} = await verify(token) as {id: string};

  if (!id) {
    res.status(403).send('Unauthorized!');
    return;
  }

  switch (req.method) {
    case 'GET':

      const cart = await client.carts.findMany({where: {userId: Number(id)}, ...cartQuery});

      res.status(200).send(getCart(cart));
      return;

    case 'POST':

      if (! await validateRequestBody(req, res, client, id)) return;

      const {variantId, quantity} = req.body;

      const item = await client.carts.create({
        data: {
          userId: Number(id),
          variantId,
          quantity,
        },
      });

      res.status(201).json(item);
      return;

    default:
      res.status(405).send('Only GET, PUT, POST and DELETE methods are allowed!');
      return;
  };
};

const getCart = (objects: GetCartQueryResult[]): Item[] => {
  return objects.map(
    (object): Item => ({
      variantId: object.variantId,
      quantity: object.quantity,
    }),
  );
};

const validateRequestBody = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>, client: PrismaClient, id: string): Promise<boolean> => {

  const {variantId, quantity} = req.body;

  if (!variantId) {
    res.status(400).send('You did not provide a valid variantId attribute!');
    return false;
  }

  const item = await client.carts.findFirst({where: {userId: Number(id), variantId}});

  if (!!item) {
    res.status(400).send('There is already a product with this variantId in your cart. Send a PUT request instead!');
    return false;
  }

  if (!quantity || quantity < 1) {
    res.status(400).send('You did not provide a valid quantity attribute!');
    return false;
  }

  return true;
};


export default handler;

import {NextApiRequest, NextApiResponse} from 'next';
import {IncomingMessage} from 'http';

import {PrismaClient} from '@prisma/client';


const METHODS: IncomingMessage['method'][] = ['GET'];

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const {id} = req.query;

  if (!METHODS.includes(req.method)) return;

  const client: PrismaClient = new PrismaClient();

  const category = await client.categories.findFirst({
    where: {id: Number(id)},
    select: {
      name: true,
      description: true,
      products: {
        select: {
          name: true,
          description: true,
          productVariants: {
            select: {
              name: true,
              price: true,
              productAttributes: {
                select: {
                  name: true,
                  value: true,
                }
              },
            },
          },
        },
      },
    },
  });

  res.status(200).json(category);
};

export default handler;

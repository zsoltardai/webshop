import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient} from '@prisma/client';


type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const {id} = req.query;

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {
    case 'GET':
      const category = await client.category.findFirst({
        where: {id: Number(id)},
        select: {
          name: true,
          description: true,
          products: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      });
    
      res.status(200).json(category);
      return;

    default:

      res.status(405).send('Only GET method is allowed!');
      return;
  };
};

export default handler;

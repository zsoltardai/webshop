import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient} from '@prisma/client';


type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {

    case 'GET':

      const categories = await client.categories.findMany({});

      res.status(200).json(categories);
      return;

    case 'POST':

      if (!await validateRequestBody(req, res)) return;

      const {name, description} = req.body;

      const category = await client.categories.create({
        data: {
          name,
          description,
        },
      });

      res.status(201).json(category);
      
      return;

    default:

      res.status(405).send('Only POST and GET methods are allowed!');
      return;
  }
};

const validateRequestBody = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<boolean> => {

  const {name, description} = req.body;

  if (!name || name.trim() === '') {
    res.status(400).send('You did not provide a valid name attribute!');
    return false;
  }

  if (!description || description.trim() === '') {
    res.status(400).send('You did not provide a valid description attribute!');
    return false;
  }

  return true;
};

export default handler;
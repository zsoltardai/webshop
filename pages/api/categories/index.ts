import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient} from '@prisma/client';

import {verifyAdminJWT} from '@webshop/helpers/verifyJWT';


type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {

    case 'GET':

      let categories;

      try {
        categories = await client.category.findMany({
          select: {
            id: true,
            name: true,
            description: true,
          }
        });
      } catch (error: any) {
        res.status(500).json('Failed to connect to the database, try again later!');
        return;
      }

      res.status(200).json(categories);
      return;

    case 'POST':

      const content = await verifyAdminJWT(req, res);
  
      if (!content) return;

      if (!await validateRequestBody(req, res)) return;

      const {id} = content;

      const {name, description} = req.body;

      let category;

      try {
        category = await client.category.create({
          data: {
            name,
            description,
            createdById: Number(id),
          },
        });
      } catch (error: any) {
        res.status(500).send('Failed to connect to the databae, please try again later!');
        return;
      }

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
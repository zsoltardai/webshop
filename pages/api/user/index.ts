import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient} from '@prisma/client';

import {verify} from '@webshop/utils/jwt';


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

    case 'DELETE': 

      const user = await client.users.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        res.status(404).send(`We could not find a user with the provided id!`);
        return;
      }

      await client.users.delete({where: {id: Number(id)}});

      res.status(204).send('');
      return;

    case 'PUT':

      {
        if (!validateRequestBody(req, res)) return;

        if (req.body.hasOwnProperty('email')) {
          const user = await client.users.findFirst({
            where: {
              email: req.body.email,
            },
          });

          if (!!user) {
            res.status(409).send('A user already exists with the provided e-mail address!');
            return;
          }
        }

        const update: {[key: string]: string} = {};

        for (const key in req.body) {
          if (!req.body[key]) return;
          update[key] = req.body[key];
        }

        const user = await client.users.update({
          where: {id: Number(id)},
          data: {...update},
        })

        const {firstName, lastName, email} = user;
  
        return res.status(200).json({
          firstName,
          lastName,
          email,
        });
      }

    case 'GET':
      {
        const user = await client.users.findFirst({where: {id: Number(id)}});

        if (!user) {
          res.status(404).send(`We couldn't find a user with the provided id!`);
          return;
        }

        const {firstName, lastName, email} = user;

        return res.status(200).json({
          firstName,
          lastName,
          email,
        });
      }
      
    default:
      res.status(405).send('Only GET, PUT and DELETE methods are allowed!');
      return;
  }
};


const validateRequestBody = (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): boolean => {

  const {firstName, lastName, email} = req.body;

  if (firstName && firstName.trim() === '') {
    res.status(400).send('You did not provide a valid firstName attribute!');
    return false;
  }

  if (lastName && lastName.trim() === '') {
    res.status(400).send('You did not provide a valid lastName attribute!');
    return false;
  }

  if (email && email.trim() === '') {
    res.status(400).send('You did not provide a valid email attribute!');
    return false;
  }

  return true;
};

export default handler;

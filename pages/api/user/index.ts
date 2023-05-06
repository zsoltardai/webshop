import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient} from '@prisma/client';

import {verifyJWT} from '@webshop/helpers/verifyJWT';


type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const client: PrismaClient = new PrismaClient();

  const content = await verifyJWT(req, res);

  if (!content) return;

  const {id} = content;

  switch (req.method) {

    case 'DELETE': 

      let user;

      try {
        user =  await client.user.findFirst({where: {id: Number(id)}});
      } catch (error: any) {

        console.log(error.message);
        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

      if (!user) {
        res.status(404).send(`We could not find a user with the provided id!`);
        return;
      }

      await client.user.delete({where: {id: Number(id)}});

      res.status(204).send('');
      return;

    case 'PUT':

      {
        if (!validateRequestBody(req, res)) return;

        if (req.body.hasOwnProperty('email')) {

          let user;

          try {
            user =  await client.user.findFirst({
              where: {
                email: req.body.email,
              },
            });
          } catch (error: any) {

            res.status(500).send('Failed to connect to the database, please try again later!');
            return;
          }

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

        let user;

        try {
          user = await client.user.update({
            where: {id: Number(id)},
            data: {...update},
          })

        } catch (error: any) {

          res.status(500).send('Failed to connect to the database, please try again later!');
          return;
        }

        const {firstName, lastName, email, admin} = user;
  
        return res.status(200).json({
          firstName,
          lastName,
          email,
          admin,
        });
      }

    case 'GET':
      {
        let user;

        try {
          user = await client.user.findFirst({where: {id: Number(id)}});
        } catch (error: any) {

          res.status(500).send('Failed to connect to the database, please try again later!');
          return;
        }


        if (!user) {
          res.status(404).send(`We couldn't find a user with the provided id!`);
          return;
        }

        const {firstName, lastName, email, admin} = user;

        return res.status(200).json({
          firstName,
          lastName,
          email,
          admin,
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

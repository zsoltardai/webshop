import {NextApiRequest, NextApiResponse} from 'next';
import {IncomingMessage} from 'http';

import {PrismaClient} from '@prisma/client';

import hash from '@webshop/utils/hash';
import {sign} from '@webshop/utils/jwt';


const METHODS: IncomingMessage['method'][] = ['POST'];

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  if (!METHODS.includes(req.method)) {
    res.status(405).send('Only POST methods are allowed!');
    return;
  }

  if (!validateRequestBody(req, res)) return;

  const {email, password} = req.body;
  
  const client: PrismaClient = new PrismaClient();

  const passwordHash: string = hash(password);

  let user;

  try {
    user = await client.users.findFirst({where: {email}});
  } catch (error: any) {
    res.status(500).send('Failed to connect to the database, please try again later!');
    return;
  }

  if (!user) {
    res.status(404).send(`We couldn't find a user with the provided e-mail address!`);
    return;
  }

  if (user.password !== passwordHash) {
    res.status(403).send('Unauthorized!');
    return;
  }

  const token: string = sign({id: user.id});

  res.status(200).send(token);
};


const validateRequestBody = (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): boolean => {

  const {email, password} = req.body;

  if (!email || email.trim() === '') {
    res.status(400).send('You did not provide a valid email attribute!');
    return false;
  }

  if (!password || password.trim() === '') {
    res.status(400).send('You did not provide a valid password attribute!');
    return false;
  }

  return true;
};

export default handler;

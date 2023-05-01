import {NextApiRequest, NextApiResponse} from 'next';
import {IncomingMessage} from 'http';

import {PrismaClient} from '@prisma/client';

import hash from '@webshop/utils/hash';


const METHODS: IncomingMessage['method'][] = ['POST'];

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  if (!METHODS.includes(req.method)) {
    res.status(405).send('Only POST methods are allowed on this route!');
    return;
  }

  if (!validateRequestBody(req, res)) return;

  const {firstName, lastName, email, password} = req.body;

  const client: PrismaClient = new PrismaClient();

  const user = await client.users.findFirst({
    where: {
      email,
    }
  });

  if (!!user) {
    res.status(409).send(`A user already exists with the provided email: "${email}" address!`);
    return;
  }

  const passwordHash: string = hash(password);

  try {
    await client.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: passwordHash,
      }
    });
  } catch (error: any) {
    res.status(500).send('');
    return;
  }


  res.status(200).send('');
};


const validateRequestBody = (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): boolean => {

  const {firstName, lastName, email, password, confirmation} = req.body;

  if (!firstName || firstName.trim() === '') {
    res.status(400).send('You did not provide a valid firstName attribute!');
    return false;
  }

  if (!lastName || lastName.trim() === '') {
    res.status(400).send('You did not provide a valid lastName attribute!');
    return false;
  }

  if (!email || email.trim() === '') {
    res.status(400).send('You did not provide a valid email attribute!');
    return false;
  }

  if (!password || password.trim() === '') {
    res.status(400).send('You did not provide a valid password attribute!');
    return false;
  }

  if (!confirmation || confirmation.trim() === '') {
    res.status(401).send('You did not provide a valid confirmation attribute!');
    return false;
  }

  if (password !== confirmation) {
    res.status(401).send('The provided passwords did not match!');
    return false;
  }

  return true;
};

export default handler;

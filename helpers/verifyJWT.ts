import {NextApiRequest, NextApiResponse} from 'next';

import {verify} from '@webshop/utils/jwt';


type JWTContent = {id: string};

type AdminJWTContent = JWTContent & {admin: boolean};

const getAuthorizationHeader = async <T>(req: NextApiRequest): Promise<T> => {
  const token: string = req.headers['authorization'] as string;
  return await verify(token) as T;
};


export const verifyJWT = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<JWTContent | undefined> => {

  const content: JWTContent = await getAuthorizationHeader<JWTContent>(req);

  const {id} = content;

  if (!id) {
    res.status(403).send('Unauthorized!');
    return;
  }

  return content;
};

export const verifyAdminJWT = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<AdminJWTContent | undefined> => {

  const content: AdminJWTContent = await getAuthorizationHeader<AdminJWTContent>(req);

  const {id, admin} = content;

  console.log(content);

  if (!id || !admin) {
    res.status(403).send('Unauthorized!');
    return;
  }

  return content;
};

import jwt from 'jsonwebtoken';


const SECRET: string = process.env.SECRET as string;

export const sign = (data: Object): string => jwt.sign(data, SECRET);

export const verify = async (text: string): Promise<Object> => {
  try {
    if (!text) return {};

    const [_, token] = text.split(' ');

    return await jwt.verify(token, SECRET);

  } catch (error: any) {
    return {};
  }
};

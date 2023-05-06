import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient, Prisma} from '@prisma/client';

import type {Variant} from '@webshop/models';

import {verifyAdminJWT} from '@webshop/helpers/verifyJWT';


const variantsQuery = {
  select: {
    id: true,
    name: true,
    price: true,
    attributes: true,
    product: {
      select: {
        slug: true,
        description: true,
      },
    },
    images: {
      select: {
        url: true,
      },
    },
  },
};

type GetVariantsQueryResult = Prisma.VariantGetPayload<typeof variantsQuery>;

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {

    case 'GET':
      let variants;

      try {
        variants = await client.variant.findMany({...variantsQuery});
      } catch (error: any) {

        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

      res.status(200).json(getVariants(variants));
      return;

    case 'POST':

      const content = await verifyAdminJWT(req, res);

      if (!content) return;

      const {id: userId} = content;

      if (!await validateRequestBody(req, res, client)) return;

      const {id, name, images, price, attributes} = req.body;
    
      let variant;

      try {
        variant = await client.variant.create({
          data: {
            productId: id,
            name,
            price,
            attributes,
            createdById: Number(userId),
            images: {
              createMany: {
                data: images.map(
                  (image: string) => ({
                    url: image,
                  }),
                ),
              },
            },
          },
        });
      } catch (error: any) {
        
        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }
    
      res.status(201).json(variant);
      return;

    default:

      res.status(405).send(`The ${req.method} method is not are allowed!`);
      return;
  }
};


const getVariants = (objects: GetVariantsQueryResult[]): Variant[] => {
  return objects.map(
    (object): Variant => {

      const images: string[] = [];

      object.images.forEach(
        (image) => images.push(image.url),
      );

      return {
        id: object.id,
        description: object.product.description,
        slug: object.product.slug, 
        name: object.name,
        price: Number(object.price),
        attributes: object.attributes as {[key: string]: string},
        images,
      };
    },
  );
};

const validateRequestBody = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>, client: PrismaClient): Promise<boolean> => {

  const {id, name, images, price, attributes} = req.body;

  if (!id || typeof id !== 'number') {
    res.status(400).send('You did not provide a valid id attribute!');
    return false;
  }

  let product;

  try {
    product = await client.product.findFirst({where: {id: id}});
  } catch (error: any) {

    res.status(500).send('Failed to connect to the database, please try again later!');
    return false;
  }

  if (!product) {
    res.status(404).send('There is no product with the provided id!');
    return false;
  }

  if (!images || !Array.isArray(images)) {
    res.status(400).send('You did not provide a valid images attribute!');
    return false;
  }


  if (!name || name.trim() === '') {
    res.status(400).send('You did not provide a valid name attribute!');
    return false;
  }

  if (!price || typeof price !== 'number' || price < 0) {
    res.status(400).send('You did not provide a valid price attribute!');
    return false;
  }

  if (attributes && typeof attributes !== 'object') {
    res.status(400).send('You did not provide a valid attributes attribute!');
    return false;
  }

  return true;
};

export default handler;

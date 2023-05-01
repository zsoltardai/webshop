import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient, Prisma} from '@prisma/client';

import type {Variant} from '@webshop/models';


const variantsQuery = {
  select: {
    id: true,
    name: true,
    price: true,
    attributes: true,
    products: {
      select: {
        slug: true,
        description: true,
      },
    },
    productImages: {
      select: {
        imageUrl: true,
      },
    },
  },
};

type GetVariantsQueryResult = Prisma.productVariantsGetPayload<typeof variantsQuery>;

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {

    case 'GET':

      try {

        const productVariants = await client.productVariants.findMany({...variantsQuery,});


        res.status(200).json(getVariants(productVariants));
        return;
      } catch (error) {
        res.status(200).send(JSON.stringify(error, null, 4));
        return;
      }


    case 'POST':
      if (!await validateRequestBody(req, res, client)) return;

      const {id, name, images, price, attributes} = req.body;
    
      const productVariant = await client.productVariants.create({
        data: {
          productId: id,
          name,
          price,
          attributes,
          productImages: {
            createMany: {
              data: images.map(
                (image: string) => ({
                  imageUrl: image,
                }),
              ),
            },
          },
        },
      });
    
      res.status(201).json(productVariant);
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

      object.productImages.forEach(
        (image) => images.push(image.imageUrl),
      );

      return {
        id: object.id,
        description: object.products.description,
        slug: object.products.slug, 
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

  const product = await client.products.findFirst({where: {id: id}});

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

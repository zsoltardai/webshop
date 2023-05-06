import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient, Prisma} from '@prisma/client';

import type {Product} from '@webshop/models';

import {verifyAdminJWT} from '@webshop/helpers/verifyJWT';


const productsQuery = {
  select: {
    id: true,
    slug: true,
    name: true,
    description: true,
    variants: {
      select: {
        name: true,
        price: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    },
  },
};

type GetProductsQueryResult = Prisma.ProductGetPayload<typeof productsQuery>;

type ResponsePayload = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>): Promise<void> => {

  const client: PrismaClient = new PrismaClient();

  switch (req.method) {

    case 'POST':

    if (!await verifyAdminJWT(req, res)) return;

    if (!await validateRequestBody(req, res, client)) return;

      const {slug, productName, variantName, images, description, price, categoryId, attributes = []} = req.body;
    
      let product;

      try {
        product = await client.product.create({
          data: {
            slug,
            name: productName,
            description,
            categoryId,
            variants: {
              create: {
                name: variantName,
                price,
                attributes,
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
            }
          },
        });
      } catch (error: any) {

        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }
    
      res.status(201).json(product);
      return;

    case 'GET':

      let products;

      try {
        products = await client.product.findMany({...productsQuery});
      } catch (error: any) {

        res.status(500).send('Failed to connect to the database, please try again later!');
        return;
      }

      res.status(200).json(getProducts(products));
      return;

    default: 

      res.status(405, )
      return;
  };
};

const getProducts = (objects: GetProductsQueryResult[]): Product[] => {
  return objects.map(
    (object): Product => {

      const price: number = Number(object.variants?.[0]?.price);

      const images: string[] = [];

      object.variants.forEach(
        (variant): void => {
          variant.images.map(
            (image) => images.push(image.url),
          );
        },
      );

      return {
        id: object.id,
        slug: object.slug,
        name: object.name,
        description: object.description || '',
        images,
        price,
      };
    },
  );
};



const validateRequestBody = async (req: NextApiRequest, res: NextApiResponse<ResponsePayload>, client: PrismaClient): Promise<boolean> => {

  const {slug, productName, variantName, images, description, price, categoryId, attributes} = req.body;

  if (!slug || slug.trim() === '') {
    res.status(400).send('You did not provide a valid slug attribute!');
    return false;
  }

  const product = await client.product.findFirst({where: {slug}});

  if (!!product) {
    res.status(409).send('A product already exists with the provided slug, choose an other one!');
    return false;
  }

  if (!productName || productName.trim() === '') {
    res.status(400).send('You did not provide a valid productName attribute!');
    return false;
  }

  if (!variantName || variantName.trim() === '') {
    res.status(400).send('You did not provide a valid productName attribute!');
    return false;
  }

  if (!images || !Array.isArray(images)) {
    res.status(400).send('You did not provide a valid images attribute!');
    return false;
  }

  if (!description || description.trim() === '') {
    res.status(400).send('You did not provide a valid description attribute!');
    return false;
  }

  if (!price || typeof price !== 'number' || price < 0) {
    res.status(400).send('You did not provide a valid price attribute!');
    return false;
  }

  if (!categoryId) {
    res.status(400).send('You did not provide a valid categoryId attribute!');
    return false;
  }

  const category = await client.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    res.status(400).send('You did not provide a valid categoryId attribute!');
    return false;
  }

  if (attributes && typeof attributes !== 'object') {
    res.status(400).send('You did not provide a valid attributes attribute!');
    return false;
  }

  return true;
};

export default handler;
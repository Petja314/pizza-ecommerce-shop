import { hashSync } from 'bcrypt';
import { prisma } from './prisma-client';
import { _ingredients, categories, products } from './constants';

const randomNumber = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
   productId,
   pizzaType,
   size,
}: {
   productId: number;
   pizzaType?: 1 | 2;
   size?: 20 | 30 | 40;
}) => {
   return {
      productId,
      price: randomNumber(10, 35),
      pizzaType,
      size,
   };
};

async function up() {
   /**Create User Data */
   await prisma.user.createMany({
      data: [
         {
            fullName: 'user',
            email: 'user@test.com',
            password: hashSync('123456', 10),
            verified: new Date(),
            role: 'USER',
         },
         {
            fullName: 'admin',
            email: 'admin@test.com',
            password: hashSync('123456', 10),
            verified: new Date(),
            role: 'ADMIN',
         },
      ],
   });

   /**CREATE CATEGORY */
   await prisma.category.createMany({
      data: categories,
   });

   await prisma.ingridient.createMany({
      data: _ingredients,
   });

   await prisma.product.createMany({
      data: products,
   });

   /**CREATE PRODUCT */
   const pizza1 = await prisma.product.create({
      data: {
         name: 'Pepperoni fresh',
         imageUrl: '/prisma-product-img/pizza/peperroni-fresh.webp',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza2 = await prisma.product.create({
      data: {
         name: 'Cheesy',
         imageUrl: '/prisma-product-img/pizza/cheesy.webp',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(5, 10),
         },
      },
   });

   const pizza3 = await prisma.product.create({
      data: {
         name: 'Chorizo fresh',
         imageUrl: '/prisma-product-img/pizza/chorizo-fresh.webp',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(10, 40),
         },
      },
   });

   const pizza4 = await prisma.product.create({
      data: {
         name: 'BBQ',
         imageUrl: '/prisma-product-img/pizza/bbq.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza5 = await prisma.product.create({
      data: {
         name: 'Burger',
         imageUrl: '/prisma-product-img/pizza/burger.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza6 = await prisma.product.create({
      data: {
         name: 'Diablo',
         imageUrl: '/prisma-product-img/pizza/diablo.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza7 = await prisma.product.create({
      data: {
         name: 'Double Cheese',
         imageUrl: '/prisma-product-img/pizza/double cheese.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza8 = await prisma.product.create({
      data: {
         name: 'Four Season Mix',
         imageUrl: '/prisma-product-img/pizza/four season mix.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza9 = await prisma.product.create({
      data: {
         name: 'Ham and Cheese',
         imageUrl: '/prisma-product-img/pizza/ham and cheese.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza10 = await prisma.product.create({
      data: {
         name: 'Hawaian',
         imageUrl: '/prisma-product-img/pizza/hawaian.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza11 = await prisma.product.create({
      data: {
         name: 'Meat',
         imageUrl: '/prisma-product-img/pizza/meat.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   const pizza12 = await prisma.product.create({
      data: {
         name: 'Mushrooms',
         imageUrl: '/prisma-product-img/pizza/mushrooms.avif',
         categoryId: 1,
         ingridients: {
            connect: _ingredients.slice(0, 5),
         },
      },
   });

   /**CREATE VARIATIONS */
   // await prisma.variations.createMany({
   //     data: [
   //         {
   //             productId: pizza1.id,
   //             pizzaType: 1,
   //             size: 20,
   //             price: randomNumber(190, 600),
   //         },
   //         {
   //             productId: pizza1.id,
   //             pizzaType: 2,
   //             size: 30,
   //             price: randomNumber(190, 600),
   //         },
   //         {
   //             productId: pizza1.id,
   //             pizzaType: 2,
   //             size: 40,
   //             price: randomNumber(190, 600),
   //         },
   //     ],
   // });
   await prisma.variations.createMany({
      data: [
         // Пицца "Peperoni fresh"
         generateProductItem({
            productId: pizza1.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza1.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza1.id,
            pizzaType: 2,
            size: 40,
         }),

         // Pizza "Cheesy"
         generateProductItem({
            productId: pizza2.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza2.id,
            pizzaType: 1,
            size: 30,
         }),
         generateProductItem({
            productId: pizza2.id,
            pizzaType: 1,
            size: 40,
         }),
         generateProductItem({
            productId: pizza2.id,
            pizzaType: 2,
            size: 20,
         }),
         generateProductItem({
            productId: pizza2.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza2.id,
            pizzaType: 2,
            size: 40,
         }),

         // Pizza "Chorizo fresh"
         generateProductItem({
            productId: pizza3.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza3.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza3.id,
            pizzaType: 2,
            size: 40,
         }),
         //BBQ
         generateProductItem({
            productId: pizza4.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza4.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza4.id,
            pizzaType: 2,
            size: 40,
         }),

         //Burger
         generateProductItem({
            productId: pizza5.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza5.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza5.id,
            pizzaType: 2,
            size: 40,
         }),

         //Diablo
         generateProductItem({
            productId: pizza6.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza6.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza6.id,
            pizzaType: 2,
            size: 40,
         }),

         //Double Cheese
         generateProductItem({
            productId: pizza7.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza7.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza7.id,
            pizzaType: 2,
            size: 40,
         }),

         //Four Season Mix
         generateProductItem({
            productId: pizza8.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza8.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza8.id,
            pizzaType: 2,
            size: 40,
         }),

         //Ham and Cheese
         generateProductItem({
            productId: pizza9.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza9.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza9.id,
            pizzaType: 2,
            size: 40,
         }),

         //Hawaian
         generateProductItem({
            productId: pizza10.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza10.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza10.id,
            pizzaType: 2,
            size: 40,
         }),

         //Meat
         generateProductItem({
            productId: pizza11.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza11.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza11.id,
            pizzaType: 2,
            size: 40,
         }),

         //Mushrooms
         generateProductItem({
            productId: pizza12.id,
            pizzaType: 1,
            size: 20,
         }),
         generateProductItem({
            productId: pizza12.id,
            pizzaType: 2,
            size: 30,
         }),
         generateProductItem({
            productId: pizza12.id,
            pizzaType: 2,
            size: 40,
         }),
         // Rest of the products
         generateProductItem({ productId: 1 }),
         generateProductItem({ productId: 2 }),
         generateProductItem({ productId: 3 }),
         generateProductItem({ productId: 4 }),
         generateProductItem({ productId: 5 }),
         generateProductItem({ productId: 6 }),
         generateProductItem({ productId: 7 }),
         generateProductItem({ productId: 8 }),
         generateProductItem({ productId: 9 }),
         generateProductItem({ productId: 10 }),
         generateProductItem({ productId: 11 }),
         generateProductItem({ productId: 12 }),
         generateProductItem({ productId: 13 }),
         generateProductItem({ productId: 14 }),
         generateProductItem({ productId: 15 }),
         generateProductItem({ productId: 16 }),
         generateProductItem({ productId: 17 }),
      ],
   });

   await prisma.cart.createMany({
      data: [
         {
            userId: 1,
            totalAmount: 0,
            token: '111',
         },
         {
            userId: 2,
            totalAmount: 0,
            token: '222',
         },
      ],
   });

   await prisma.cartItem.create({
      data: {
         variationsId: 1,
         cartId: 1,
         quantity: 2,
         ingridients: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
         },
      },
   });

   await prisma.story.createMany({
      data: [
         {
            previewImageUrl:
               '/prisma-product-img/story/insta-story-front/front.png',
         },
         {
            previewImageUrl:
               '/prisma-product-img/story/insta-story-front/COFFE WITH TASTE (1).png',
         },
         {
            previewImageUrl:
               '/prisma-product-img/story/insta-story-front/COFFE WITH TASTE (2).png',
         },
         {
            previewImageUrl:
               '/prisma-product-img/story/insta-story-front/COFFE WITH TASTE (3).png',
         },
         {
            previewImageUrl:
               '/prisma-product-img/story/insta-story-front/COFFE WITH TASTE (4).png',
         },
         {
            previewImageUrl:
               '/prisma-product-img/story/insta-story-front/COFFE WITH TASTE.png',
         },
      ],
   });

   await prisma.storyItem.createMany({
      data: [
         {
            storyId: 1,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/1.png',
         },
         {
            storyId: 1,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/3.png',
         },
         {
            storyId: 2,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/2.png',
         },
         {
            storyId: 2,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/4.png',
         },
         {
            storyId: 3,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/3.png',
         },
         {
            storyId: 3,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/6.png',
         },
         {
            storyId: 4,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/4.png',
         },
         {
            storyId: 4,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/1.png',
         },
         {
            storyId: 5,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/5.png',
         },
         {
            storyId: 5,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/2.png',
         },
         {
            storyId: 6,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/6.png',
         },
         {
            storyId: 6,
            sourceUrl:
               '/prisma-product-img/story/insta-story-front/items/3.png',
         },
      ],
   });
}

async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Ingridient" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Variations" RESTART IDENTITY CASCADE`;
}

async function main() {
   try {
      await down();
      await up();
   } catch (e) {
      console.error(e);
   }
}
main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });

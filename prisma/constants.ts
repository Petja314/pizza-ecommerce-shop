export const categories = [
   {
      name: 'Pizza',
      rating: 1,
   },
   {
      name: 'Breakfast',
      rating: 4,
   },
   {
      name: 'Snacks',
      rating: 2,
   },
   {
      name: 'Cocktails',
      rating: 3,
   },
   {
      name: 'Drinks',
      rating: 5,
   },
];

export const _ingredients = [
   {
      name: 'Cheese Crust',
      price: 179,
      imageUrl: '/prisma-product-img/pizza/ingridients/Cheese Crust.png', // относительный путь
   },
   {
      name: 'Creamy Mozzarella',
      price: 79,
      imageUrl: '/prisma-product-img/pizza/ingridients/Creamy Mozzarella.png',
   },
   {
      name: 'Cheddar and Parmesan Cheeses',
      price: 79,
      imageUrl:
         '/prisma-product-img/pizza/ingridients/Cheddar and Parmesan Cheeses.png',
   },
   {
      name: 'Spicy Jalapeno Pepper',
      price: 59,
      imageUrl:
         '/prisma-product-img/pizza/ingridients/Spicy Jalapeno Pepper.png',
   },
   {
      name: 'Tender Chicken',
      price: 79,
      imageUrl: '/prisma-product-img/pizza/ingridients/Tender Chicken.png',
   },
   {
      name: 'Mushrooms',
      price: 59,
      imageUrl: '/prisma-product-img/pizza/ingridients/Mushrooms.png',
   },
   {
      name: 'Ham',
      price: 79,
      imageUrl: '/prisma-product-img/pizza/ingridients/Ham.png',
   },
   {
      name: 'Spicy Pepperoni',
      price: 79,
      imageUrl: '/prisma-product-img/pizza/ingridients/Spicy Pepperoni.png',
   },
   {
      name: 'Spicy Chorizo',
      price: 79,
      imageUrl: '/prisma-product-img/pizza/ingridients/Spicy Chorizo.png',
   },
   {
      name: 'Pickled Cucumbers',
      price: 59,
      imageUrl: '/prisma-product-img/pizza/ingridients/Pickled Cucumbers.png',
   },
   {
      name: 'Fresh Tomatoes',
      price: 59,
      imageUrl: '/prisma-product-img/pizza/ingridients/Fresh Tomatoes.png',
   },
   {
      name: 'Red Onion',
      price: 59,
      imageUrl: '/prisma-product-img/pizza/ingridients/Red Onion.png',
   },
   {
      name: 'Juicy Pineapples',
      price: 59,
      imageUrl: '/prisma-product-img/pizza/ingridients/Juicy Pineapples.png',
   },
   {
      name: 'Italian Herbs',
      price: 39,
      imageUrl: '/prisma-product-img/pizza/ingridients/Italian Herbs.png',
   },
   {
      name: 'Sweet Pepper',
      price: 59,
      imageUrl: '/prisma-product-img/pizza/ingridients/Sweet Pepper.png',
   },
   {
      name: 'Bryndza Cubes',
      price: 79,
      imageUrl: '/prisma-product-img/pizza/ingridients/Bryndza Cubes.png',
   },
   {
      name: 'Meatballs',
      price: 79,
      imageUrl: '/prisma-product-img/pizza/ingridients/Meatballs.png',
   },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
   {
      name: 'Omelette with Ham and Mushrooms',
      imageUrl:
         '/prisma-product-img/breakfast/omlette with ham and mushrooms.webp',
      categoryId: 2,
   },
   {
      name: 'Omelette with Pepperoni',
      imageUrl: '/prisma-product-img/breakfast/omlete with pepperoni.webp',
      categoryId: 2,
   },
   {
      name: 'Caffè Latte',
      imageUrl: '/prisma-product-img/drinks/latte.webp',
      categoryId: 5,
   },
   {
      name: 'Sandwich Ham and Cheese',
      imageUrl: '/prisma-product-img/snacks/ham-and-cheese.webp',
      categoryId: 3,
   },
   {
      name: 'Chicken Nuggets',
      imageUrl: '/prisma-product-img/snacks/nuggets.avif',
      categoryId: 3,
   },
   {
      name: 'Baked Potatoes with Sauce 🌱',
      imageUrl: '/prisma-product-img/snacks/baked-potato.webp',
      categoryId: 3,
   },
   {
      name: 'Dodster',
      imageUrl: '/prisma-product-img/snacks/dodster.webp',
      categoryId: 3,
   },
   {
      name: 'Spicy Dodster 🌶️🌶️',
      imageUrl: '/prisma-product-img/snacks/spicy-dodster.webp',
      categoryId: 3,
   },
   {
      name: 'Banana Milkshake',
      imageUrl: '/prisma-product-img/cocktails/banana-milk.webp',
      categoryId: 4,
   },
   {
      name: 'Caramel Apple Milkshake',
      imageUrl: '/prisma-product-img/cocktails/caramel-milk.webp',
      categoryId: 4,
   },
   {
      name: 'Oreo Cookie Milkshake',
      imageUrl: '/prisma-product-img/cocktails/oreo-milk.webp',
      categoryId: 4,
   },
   {
      name: 'Classic Milkshake 👶',
      imageUrl: '/prisma-product-img/cocktails/milkshake.webp',
      categoryId: 4,
   },
   {
      name: 'Irish Cappuccino',
      imageUrl: '/prisma-product-img/drinks/latte.webp',
      categoryId: 5,
   },
   {
      name: 'Caramel Cappuccino',
      imageUrl: '/prisma-product-img/drinks/caramel-cappucino.webp',
      categoryId: 5,
   },
   {
      name: 'Coconut Latte',
      imageUrl: '/prisma-product-img/drinks/latte-coconut.webp',
      categoryId: 5,
   },
   {
      name: 'Americano',
      imageUrl: '/prisma-product-img/drinks/americano.webp',
      categoryId: 5,
   },
   {
      name: 'Caffè Latte',
      imageUrl: '/prisma-product-img/drinks/nuts-latte.avif',
      categoryId: 5,
   },
];

type Category = {
  id: number;
  title: string;
  imageUrl: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type CartProduct = Product & {quantity: number};

export type { Category, Product, CartProduct };

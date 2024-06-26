type Category = {
  id: number;
  title: string;
  imageUrl: string;
  route?: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type ProductCategories = {
  title: string;
  items: Product[];
};

type CartProduct = Product & {quantity: number};

type CategoryMap = {
  [key: string] : Product[];
}

export type { Category, Product, CartProduct, ProductCategories, CategoryMap };

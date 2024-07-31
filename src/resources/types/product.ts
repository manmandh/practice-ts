export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  amount: number;
  price: number;
  salePrice: number;
  image: string;
  status?: string;
}

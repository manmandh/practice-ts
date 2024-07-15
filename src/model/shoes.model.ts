class Shoes {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  amount: number;
  price: number;
  salePrice: number;
  image?: File | null;
  status?: string;

  constructor({
    id,
    brand,
    name,
    category,
    status,
    image,
    amount,
    price,
    salePrice,
    description,
  }: {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    amount: number;
    price: number;
    salePrice: number;
    image?: File | null;
    status?: string;
  }) {
    this.id = id;
    this.brand = brand;
    this.name = name;
    this.category = category;
    this.status = status;
    this.image = image;
    this.amount = amount;
    this.price = price;
    this.salePrice = salePrice;
    this.description = description;
  }
}

export default Shoes;

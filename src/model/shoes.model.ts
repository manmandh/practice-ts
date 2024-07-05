class Shoes {
  id: number;
  brand: string;
  name: string;
  category: string;
  status: boolean;
  image: string;
  amount: number;
  price: number;
  salePrice?: number;
  description?: string;

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
    brand: string;
    name: string;
    category: string;
    status: boolean;
    image: string;
    amount: number;
    price: number;
    salePrice?: number;
    description?: string;
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

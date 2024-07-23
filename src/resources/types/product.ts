export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  amount: number;
  price: number;
  salePrice: number;
  imageUrl: string;
  image?: File | null;
  status?: string;
}

export interface MyFile extends File {
  lastModified: number;
  webkitRelativePath: string;
  arrayBuffer(): Promise<ArrayBuffer>;
  slice(start?: number, end?: number, contentType?: string): Blob;
}

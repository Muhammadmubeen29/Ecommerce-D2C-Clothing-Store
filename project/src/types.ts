export interface Product {
  id: string;
  _id?: string;
  slug?: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  sizeOptions?: string[];
  images?: { url: string; publicId?: string }[];
  stock?: number;
  isFeatured?: boolean;
  material?: string;
  colors?: string[];
  rating?: number;
  numReviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

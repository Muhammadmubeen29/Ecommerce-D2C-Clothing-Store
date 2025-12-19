import api from '../config/api';

export interface AdminProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizeOptions: string[];
  images: { url: string; publicId?: string }[];
  stock: number;
  isFeatured: boolean;
  material?: string;
  colors?: string[];
  rating?: number;
  numReviews?: number;
  metaTitle?: string;
  metaKeywords?: string;
}

export interface AdminOrder {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: Array<{
    product: string;
    name: string;
    quantity: number;
    size: string;
    price: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  status: string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  trackingNumber?: string;
  createdAt: string;
}

class AdminService {
  // Product Management
  async createProduct(data: Partial<AdminProduct>): Promise<AdminProduct> {
    const response = await api.post('/products', data);
    return response.data.data;
  }

  async updateProduct(id: string, data: Partial<AdminProduct>): Promise<AdminProduct> {
    const response = await api.put(`/products/${id}`, data);
    return response.data.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }

  // Order Management
  async getAllOrders(): Promise<AdminOrder[]> {
    const response = await api.get('/orders');
    return response.data.data;
  }

  async updateOrderStatus(id: string, status: string, trackingNumber?: string): Promise<AdminOrder> {
    const response = await api.put(`/orders/${id}/status`, { status, trackingNumber });
    return response.data.data;
  }
}

export default new AdminService();








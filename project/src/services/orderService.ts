import api from '../config/api';

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  size: string;
  image: string;
  price: number;
}

export interface CreateOrderData {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

class OrderService {
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await api.post('/orders', data);
    return response.data.data;
  }

  async getMyOrders(): Promise<Order[]> {
    const response = await api.get('/orders/myorders');
    return response.data.data;
  }

  async getOrderById(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data.data;
  }

  async updateOrderToPaid(id: string, paymentResult: any): Promise<Order> {
    const response = await api.put(`/orders/${id}/pay`, paymentResult);
    return response.data.data;
  }

  // Admin methods
  async getAllOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data.data;
  }

  async updateOrderStatus(id: string, status: string, trackingNumber?: string): Promise<Order> {
    const response = await api.put(`/orders/${id}/status`, { status, trackingNumber });
    return response.data.data;
  }
}

export default new OrderService();












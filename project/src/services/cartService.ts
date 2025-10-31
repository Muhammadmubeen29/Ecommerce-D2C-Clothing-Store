import api from '../config/api';
import { Product } from './productService';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
  size: string;
}

class CartService {
  async getCart(): Promise<CartItem[]> {
    const response = await api.get('/cart');
    return response.data.data;
  }

  async addToCart(data: AddToCartData): Promise<CartItem[]> {
    const response = await api.post('/cart', data);
    return response.data.data;
  }

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem[]> {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data.data;
  }

  async removeFromCart(itemId: string): Promise<CartItem[]> {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data.data;
  }

  async clearCart(): Promise<void> {
    await api.delete('/cart');
  }
}

export default new CartService();





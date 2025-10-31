import api from '../config/api';

export interface SubscribeData {
  email: string;
  source?: string;
}

class SubscriptionService {
  async subscribe(data: SubscribeData): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/subscribe', data);
    return response.data;
  }

  async unsubscribe(email: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/subscribe/unsubscribe', { email });
    return response.data;
  }

  // Admin method
  async getAllSubscribers(): Promise<any[]> {
    const response = await api.get('/subscribe');
    return response.data.data;
  }
}

export default new SubscriptionService();





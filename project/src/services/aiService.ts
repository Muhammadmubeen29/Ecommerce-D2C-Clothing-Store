import api from '../config/api';

interface GeneratePayload {
  productName: string;
  category?: string;
  price?: string | number;
  features?: string;
  audience?: string;
}

class AIService {
  async generateProductContent(payload: GeneratePayload) {
    const response = await api.post('/ai/generate-product-content', payload);
    return response.data;
  }
}

export default new AIService();

import api from '../config/api';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class ContactService {
  async submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/contact', data);
    return response.data;
  }
}

export default new ContactService();












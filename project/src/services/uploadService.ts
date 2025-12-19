import api from '../config/api';

class UploadService {
  async uploadImage(file: File) {
    const form = new FormData();
    form.append('image', file);
    const res = await api.post('/uploads/image', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }
}

export default new UploadService();

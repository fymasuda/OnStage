// OnStage — API Service
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }

    return data;
  }

  // Auth
  login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Users
  getProfile() {
    return this.request('/users/me');
  }

  updateProfile(data) {
    return this.request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Pages
  getPages(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/pages?${query}`);
  }

  getPage(slug) {
    return this.request(`/pages/${slug}`);
  }

  createPage(data) {
    return this.request('/pages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  updatePage(slug, data) {
    return this.request(`/pages/${slug}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Bookings
  getBookings() {
    return this.request('/bookings');
  }

  createBooking(data) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  updateBookingStatus(id, status) {
    return this.request(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Messages
  getConversations() {
    return this.request('/chat/conversations');
  }

  getMessages(userId) {
    return this.request(`/chat/messages/${userId}`);
  }

  sendMessage(receiverId, content) {
    return this.request('/chat/send', {
      method: 'POST',
      body: JSON.stringify({ receiverId, content }),
    });
  }

  // Credits
  getCredits() {
    return this.request('/credits/balance');
  }

  purchaseCredits(packageId) {
    return this.request('/credits/purchase', {
      method: 'POST',
      body: JSON.stringify({ packageId }),
    });
  }

  // Social
  getFeed(page = 1) {
    return this.request(`/social/feed?page=${page}`);
  }

  createPublication(data) {
    return this.request('/social/publications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  likePublication(id) {
    return this.request(`/social/publications/${id}/like`, {
      method: 'POST',
    });
  }

  addComment(id, content) {
    return this.request(`/social/publications/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // Notifications
  getNotifications() {
    return this.request('/notifications');
  }

  markAsRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }
}

export const api = new ApiService();
export default api;

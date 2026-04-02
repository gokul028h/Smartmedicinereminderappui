import type { ApiResponse, AuthResponse, PaginatedResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private async refreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      if (data.success && data.data) {
        this.setTokens(data.data.accessToken, data.data.refreshToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    let response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    // If unauthorized, attempt token refresh
    if (response.status === 401 && token) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        const newToken = this.getToken();
        response = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
      } else {
        this.clearTokens();
        window.dispatchEvent(new CustomEvent('auth:logout'));
        throw new Error('Session expired. Please login again.');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  }

  // Auth
  async login(email: string, password: string) {
    const result = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (result.data) {
      this.setTokens(result.data.accessToken, result.data.refreshToken);
    }
    return result;
  }

  async register(data: { name: string; email: string; phone?: string; password: string }) {
    const result = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (result.data) {
      this.setTokens(result.data.accessToken, result.data.refreshToken);
    }
    return result;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.clearTokens();
    }
  }

  async getProfile() {
    return this.request<any>('/auth/profile');
  }

  async updateProfile(data: any) {
    return this.request<any>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Medicines
  async getMedicines(filters?: { search?: string; isActive?: boolean }) {
    const params = new URLSearchParams();
    if (filters?.search) params.set('search', filters.search);
    if (filters?.isActive !== undefined) params.set('isActive', String(filters.isActive));
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>(`/medicines${query}`);
  }

  async getMedicine(id: string) {
    return this.request<any>(`/medicines/${id}`);
  }

  async createMedicine(data: any) {
    return this.request<any>('/medicines', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMedicine(id: string, data: any) {
    return this.request<any>(`/medicines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMedicine(id: string) {
    return this.request(`/medicines/${id}`, { method: 'DELETE' });
  }

  async getLowStockMedicines() {
    return this.request<any[]>('/medicines/low-stock');
  }

  async getExpiringSoonMedicines(days = 30) {
    return this.request<any[]>(`/medicines/expiring?days=${days}`);
  }

  // Schedules
  async getSchedules() {
    return this.request<any[]>('/schedules');
  }

  async getTodaySchedules() {
    return this.request<any[]>('/schedules/today');
  }

  async createSchedule(data: any) {
    return this.request<any[]>('/schedules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSchedule(id: string, data: any) {
    return this.request<any>(`/schedules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSchedule(id: string) {
    return this.request(`/schedules/${id}`, { method: 'DELETE' });
  }

  // Dose Logs
  async getDoseLogs(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
      });
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<PaginatedResponse<any>>(`/dose-logs${query}`);
  }

  async createDoseLog(data: any) {
    return this.request<any>('/dose-logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAdherenceStats(days = 30) {
    return this.request<any>(`/dose-logs/adherence?days=${days}`);
  }

  // SOS
  async triggerSOS(data: any) {
    return this.request<any>('/sos/trigger', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getEmergencyContacts() {
    return this.request<any[]>('/sos/contacts');
  }

  async addEmergencyContact(data: any) {
    return this.request<any>('/sos/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEmergencyContact(id: string, data: any) {
    return this.request<any>(`/sos/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEmergencyContact(id: string) {
    return this.request(`/sos/contacts/${id}`, { method: 'DELETE' });
  }

  async getSOSHistory() {
    return this.request<any[]>('/sos/history');
  }

  // Health check
  async healthCheck() {
    return this.request<any>('/health');
  }
}

export const api = new ApiClient(API_BASE);

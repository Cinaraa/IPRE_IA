const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface CreateStoryboardData {
  title: string;
  prompt: string;
  imageReff?: string;
}

export interface StoryboardResponse {
  id: number;
  title: string;
  prompt: string;
  imageReff: string | null;
  createdAt: string;
  updatedAt: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const api = new ApiClient(API_BASE_URL);

// Storyboard API functions
export const storyboardApi = {
  create: (data: CreateStoryboardData): Promise<StoryboardResponse> =>
    api.post('/storyboards', data),
  
  getAll: (): Promise<StoryboardResponse[]> =>
    api.get('/storyboards'),
  
  getById: (id: number): Promise<StoryboardResponse> =>
    api.get(`/storyboards/${id}`),
};

// Health check function
export const healthCheck = (): Promise<{ status: string; message: string }> =>
  api.get('/health');